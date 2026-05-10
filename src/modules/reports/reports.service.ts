import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReportDto } from './dto/report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(reporterId: string, dto: CreateReportDto) {
    if (reporterId === dto.reportedUserId) {
      throw new BadRequestException('No puedes reportarte a ti mismo');
    }

    const reportedUser = await this.prisma.user.findUnique({
      where: { id: dto.reportedUserId },
    });

    if (!reportedUser) {
      throw new NotFoundException('Usuario reportado no encontrado');
    }

    if (dto.sessionId) {
      await this.validateSessionParticipants(
        dto.sessionId,
        reporterId,
        dto.reportedUserId,
      );
    }

    return this.prisma.report.create({
      data: {
        reporterId,
        reportedUserId: dto.reportedUserId,
        sessionId: dto.sessionId,
        reason: dto.reason,
        description: dto.description,
      },
    });
  }

  async findMine(reporterId: string) {
    return this.prisma.report.findMany({
      where: { reporterId },
      include: {
        reportedUser: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            role: true,
          },
        },
        session: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async validateSessionParticipants(
    sessionId: string,
    reporterId: string,
    reportedUserId: string,
  ) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        trainer: true,
      },
    });

    if (!session) throw new NotFoundException('Sesión no encontrada');

    const participants = [session.clientId, session.trainer.userId];

    if (!participants.includes(reporterId)) {
      throw new ForbiddenException('No perteneces a esta sesión');
    }

    if (!participants.includes(reportedUserId)) {
      throw new BadRequestException(
        'El usuario reportado no pertenece a esta sesión',
      );
    }
  }
}