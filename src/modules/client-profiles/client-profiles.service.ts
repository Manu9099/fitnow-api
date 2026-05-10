import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateClientProfileDto } from './dto/client-profile.dto';

@Injectable()
export class ClientProfilesService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    return this.getOrCreateProfile(userId);
  }

  async updateProfile(userId: string, dto: UpdateClientProfileDto) {
    await this.getOrCreateProfile(userId);

    return this.prisma.clientProfile.update({
      where: { userId },
      data: dto,
    });
  }

  async getWallet(userId: string) {
    const profile = await this.getOrCreateProfile(userId);

    return {
      walletBalance: profile.walletBalance,
    };
  }

  async topUpWallet(userId: string, amount: number) {
    await this.getOrCreateProfile(userId);

    const profile = await this.prisma.clientProfile.update({
      where: { userId },
      data: {
        walletBalance: {
          increment: amount,
        },
      },
      select: {
        walletBalance: true,
      },
    });

    return {
      message: 'Saldo agregado correctamente',
      walletBalance: profile.walletBalance,
    };
  }

  private async getOrCreateProfile(userId: string) {
    const existing = await this.prisma.clientProfile.findUnique({
      where: { userId },
    });

    if (existing) return existing;

    return this.prisma.clientProfile.create({
      data: {
        userId,
        goals: [],
        preferredModalities: [],
      },
    });
  }
}