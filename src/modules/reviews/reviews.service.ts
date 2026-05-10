import { Injectable, NotFoundException, ForbiddenException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(clientId: string, sessionId: string, dto: CreateReviewDto) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: { review: true },
    });
    if (!session) throw new NotFoundException('Sesión no encontrada');
    if (session.clientId !== clientId) throw new ForbiddenException();
    if (session.status !== 'completed') throw new BadRequestException('Solo puedes calificar sesiones completadas');
    if (session.review) throw new ConflictException('Ya dejaste una reseña para esta sesión');

    const review = await this.prisma.review.create({
      data: {
        sessionId,
        clientId,
        trainerId: session.trainerId,
        rating:    dto.rating,
        comment:   dto.comment,
      },
    });

    // Actualizar avg_rating del trainer
    const agg = await this.prisma.review.aggregate({
      where:   { trainerId: session.trainerId },
      _avg:    { rating: true },
      _count:  { rating: true },
    });
    await this.prisma.trainerProfile.update({
      where: { id: session.trainerId },
      data: {
        avgRating:    agg._avg.rating ?? 0,
        totalReviews: agg._count.rating,
      },
    });

    return review;
  }

  async findByTrainer(trainerId: string) {
    return this.prisma.review.findMany({
      where:   { trainerId, isPublic: true },
      include: { client: { select: { fullName: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findMine(trainerId: string) {
    const profile = await this.prisma.trainerProfile.findUnique({ where: { id: trainerId } });
    if (!profile) throw new NotFoundException();
    return this.findByTrainer(trainerId);
  }
}
