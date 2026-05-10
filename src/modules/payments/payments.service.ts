import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaymentMethod, PaymentStatus, SessionStatus, UserRole } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CheckoutPaymentDto,
  ConfirmPaymentDto,
  RefundPaymentDto,
} from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async checkout(clientId: string, sessionId: string, dto: CheckoutPaymentDto) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: { payment: true },
    });

    if (!session) throw new NotFoundException('Sesión no encontrada');
    if (session.clientId !== clientId) throw new ForbiddenException();

    if (session.status === SessionStatus.cancelled) {
      throw new BadRequestException('No puedes pagar una sesión cancelada');
    }

    if (session.payment) {
      return session.payment;
    }

    if (dto.method === PaymentMethod.wallet) {
      return this.payWithWallet(clientId, sessionId, Number(session.basePrice));
    }

    return this.prisma.payment.create({
      data: {
        sessionId,
        clientId,
        amount: session.basePrice,
        method: dto.method,
        status: PaymentStatus.processing,
      },
    });
  }

  async confirm(
    paymentId: string,
    userId: string,
    role: UserRole,
    dto: ConfirmPaymentDto,
  ) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { session: true },
    });

    if (!payment) throw new NotFoundException('Pago no encontrado');

    const isOwner = payment.clientId === userId;
    const isAdmin = role === UserRole.admin;

    if (!isOwner && !isAdmin) throw new ForbiddenException();

    if (payment.status === PaymentStatus.completed) {
      return payment;
    }

    return this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.completed,
        externalPaymentId: dto.externalPaymentId,
        externalStatus: dto.externalStatus ?? 'approved',
        paidAt: new Date(),
      },
    });
  }

  async findMine(clientId: string) {
    return this.prisma.payment.findMany({
      where: { clientId },
      include: {
        session: {
          include: {
            trainer: {
              include: {
                user: {
                  select: {
                    fullName: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async refund(paymentId: string, dto: RefundPaymentDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) throw new NotFoundException('Pago no encontrado');

    if (payment.status !== PaymentStatus.completed) {
      throw new BadRequestException('Solo se pueden reembolsar pagos completados');
    }

    return this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.refunded,
        refundedAt: new Date(),
        refundAmount: dto.amount ?? payment.amount,
        refundReason: dto.reason,
      },
    });
  }

  private async payWithWallet(
    clientId: string,
    sessionId: string,
    amount: number,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.clientProfile.findUnique({
        where: { userId: clientId },
      });

      if (!profile) {
        throw new BadRequestException('El cliente no tiene perfil de wallet');
      }

      if (Number(profile.walletBalance) < amount) {
        throw new BadRequestException('Saldo insuficiente en wallet');
      }

      await tx.clientProfile.update({
        where: { userId: clientId },
        data: {
          walletBalance: {
            decrement: amount,
          },
        },
      });

      return tx.payment.create({
        data: {
          sessionId,
          clientId,
          amount,
          method: PaymentMethod.wallet,
          status: PaymentStatus.completed,
          paidAt: new Date(),
          externalStatus: 'wallet_paid',
        },
      });
    });
  }
}