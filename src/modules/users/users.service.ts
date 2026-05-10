import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

const USER_SELECT = {
  id: true, email: true, fullName: true, phone: true,
  avatarUrl: true, role: true, isActive: true,
  isEmailVerified: true, createdAt: true,
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where:  { id: userId },
      select: USER_SELECT,
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async update(userId: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where:  { id: userId },
      data:   dto,
      select: USER_SELECT,
    });
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    return this.prisma.user.update({
      where:  { id: userId },
      data:   { avatarUrl },
      select: USER_SELECT,
    });
  }

  async deactivate(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data:  { isActive: false },
    });
    return { message: 'Cuenta desactivada' };
  }
}
