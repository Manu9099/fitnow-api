import {
  Injectable, NotFoundException, ForbiddenException, BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSessionDto, CancelSessionDto, QuerySessionsDto } from './dto/session.dto';
import { SessionStatus, UserRole } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

const PLATFORM_FEE = 0.20;

@Injectable()
export class SessionsService {
  constructor(
    private prisma:  PrismaService,
    private config:  ConfigService,
  ) {}

  async create(clientId: string, dto: CreateSessionDto) {
    const trainer = await this.prisma.trainerProfile.findUnique({
      where: { id: dto.trainerId },
    });
    if (!trainer) throw new NotFoundException('Trainer no encontrado');

    const basePrice    = Number(trainer.hourlyRate) * (dto.durationMinutes ?? 60) / 60;
    const platformFee  = Number((basePrice * PLATFORM_FEE).toFixed(2));
    const trainerPayout = Number((basePrice - platformFee).toFixed(2));

    const requestExpiresAt = dto.isOnDemand
      ? new Date(Date.now() + 10 * 60 * 1000)  // 10 minutos para aceptar
      : undefined;

    return this.prisma.session.create({
      data: {
        clientId,
        trainerId:       dto.trainerId,
        scheduledAt:     new Date(dto.scheduledAt),
        durationMinutes: dto.durationMinutes ?? 60,
        modality:        dto.modality,
        locationLat:     dto.locationLat,
        locationLng:     dto.locationLng,
        locationLabel:   dto.locationLabel,
        notes:           dto.notes,
        isOnDemand:      dto.isOnDemand ?? false,
        requestExpiresAt,
        basePrice,
        platformFee,
        trainerPayout,
      },
      include: { trainer: { include: { user: { select: { fullName: true } } } } },
    });
  }

  async findMine(userId: string, role: UserRole, query: QuerySessionsDto) {
    const { status, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = role === UserRole.trainer
      ? { trainer: { userId } }
      : { clientId: userId };

    if (status) where.status = status;

    const [sessions, total] = await Promise.all([
      this.prisma.session.findMany({
        where,
        include: {
          trainer: { include: { user: { select: { fullName: true, avatarUrl: true } } } },
          payment: { select: { status: true, method: true } },
          review:  { select: { rating: true } },
        },
        orderBy: { scheduledAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.session.count({ where }),
    ]);

    return { data: sessions, total, page, limit };
  }

  async findById(id: string, userId: string, role: UserRole) {
    const session = await this.prisma.session.findUnique({
      where:   { id },
      include: {
        trainer: { include: { user: { select: { fullName: true, avatarUrl: true, phone: true } } } },
        payment: true,
        review:  true,
      },
    });

    if (!session) throw new NotFoundException('Sesión no encontrada');

    const isClient  = session.clientId === userId;
    const isTrainer = session.trainer.userId === userId;
    const isAdmin   = role === UserRole.admin;

    if (!isClient && !isTrainer && !isAdmin) throw new ForbiddenException();
    return session;
  }

  async confirm(sessionId: string, userId: string) {
    const session = await this.getSessionForTrainer(sessionId, userId);
    this.assertStatus(session.status, SessionStatus.pending);
    return this.updateStatus(sessionId, SessionStatus.confirmed);
  }

  async start(sessionId: string, userId: string) {
    const session = await this.getSessionForTrainer(sessionId, userId);
    this.assertStatus(session.status, SessionStatus.confirmed);
    return this.updateStatus(sessionId, SessionStatus.in_progress);
  }

  async complete(sessionId: string, userId: string) {
    const session = await this.getSessionForTrainer(sessionId, userId);
    this.assertStatus(session.status, SessionStatus.in_progress);

    await this.prisma.trainerProfile.update({
      where: { id: session.trainerId },
      data:  { totalSessions: { increment: 1 } },
    });

    return this.updateStatus(sessionId, SessionStatus.completed);
  }

 async cancel(sessionId: string, userId: string, dto: CancelSessionDto) {
  const session = await this.prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (!session) throw new NotFoundException();

  const trainer = await this.prisma.trainerProfile.findUnique({
    where: { id: session.trainerId },
  });

  const isOwner = session.clientId === userId || trainer?.userId === userId;

  if (!isOwner) throw new ForbiddenException();

  if (
    session.status === SessionStatus.completed ||
    session.status === SessionStatus.cancelled
  ) {
    throw new BadRequestException('Esta sesión no puede cancelarse');
  }

  return this.prisma.session.update({
    where: { id: sessionId },
    data: {
      status: SessionStatus.cancelled,
      cancellationReason: dto.reason,
      cancelledById: userId,
      cancelledAt: new Date(),
    },
  });
}

  async findUpcoming(userId: string, role: UserRole) {
    const where: any = role === UserRole.trainer
      ? { trainer: { userId }, scheduledAt: { gt: new Date() } }
      : { clientId: userId, scheduledAt: { gt: new Date() } };

    where.status = { in: [SessionStatus.pending, SessionStatus.confirmed] };

    return this.prisma.session.findMany({
      where,
      include: { trainer: { include: { user: { select: { fullName: true, avatarUrl: true } } } } },
      orderBy: { scheduledAt: 'asc' },
      take: 10,
    });
  }

  async findHistory(userId: string, role: UserRole) {
    const where: any = role === UserRole.trainer
      ? { trainer: { userId }, status: SessionStatus.completed }
      : { clientId: userId, status: SessionStatus.completed };

    return this.prisma.session.findMany({
      where,
      include: {
        trainer: { include: { user: { select: { fullName: true } } } },
        review:  { select: { rating: true, comment: true } },
      },
      orderBy: { scheduledAt: 'desc' },
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private async getSessionForTrainer(sessionId: string, userId: string) {
    const session = await this.prisma.session.findUnique({
      where:   { id: sessionId },
      include: { trainer: true },
    });
    if (!session) throw new NotFoundException('Sesión no encontrada');
    if (session.trainer.userId !== userId) throw new ForbiddenException();
    return session;
  }

  private assertStatus(current: SessionStatus, expected: SessionStatus) {
    if (current !== expected)
      throw new BadRequestException(`La sesión debe estar en estado '${expected}'`);
  }

  private updateStatus(id: string, status: SessionStatus) {
    return this.prisma.session.update({ where: { id }, data: { status } });
  }
}
