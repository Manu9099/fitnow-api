import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.notification.findMany({
      where:   { userId },
      orderBy: { createdAt: 'desc' },
      take:    50,
    });
  }

  async markRead(userId: string, notifId: string) {
    return this.prisma.notification.updateMany({
      where: { id: notifId, userId },
      data:  { isRead: true },
    });
  }

  async markAllRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data:  { isRead: true },
    });
    return { message: 'Todas marcadas como leídas' };
  }

  async registerFcmToken(userId: string, token: string, deviceType: string) {
    return this.prisma.fcmToken.upsert({
      where:  { token },
      update: { userId, deviceType },
      create: { userId, token, deviceType },
    });
  }

  // Método interno para crear notificaciones desde otros servicios
  async create(userId: string, title: string, body: string, type?: string, metadata?: object) {
    return this.prisma.notification.create({
      data: { userId, title, body, type, metadata: metadata ?? {} },
    });
  }
}
