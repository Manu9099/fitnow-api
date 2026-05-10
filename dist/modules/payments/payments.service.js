"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkout(clientId, sessionId, dto) {
        const session = await this.prisma.session.findUnique({
            where: { id: sessionId },
            include: { payment: true },
        });
        if (!session)
            throw new common_1.NotFoundException('Sesión no encontrada');
        if (session.clientId !== clientId)
            throw new common_1.ForbiddenException();
        if (session.status === client_1.SessionStatus.cancelled) {
            throw new common_1.BadRequestException('No puedes pagar una sesión cancelada');
        }
        if (session.payment) {
            return session.payment;
        }
        if (dto.method === client_1.PaymentMethod.wallet) {
            return this.payWithWallet(clientId, sessionId, Number(session.basePrice));
        }
        return this.prisma.payment.create({
            data: {
                sessionId,
                clientId,
                amount: session.basePrice,
                method: dto.method,
                status: client_1.PaymentStatus.processing,
            },
        });
    }
    async confirm(paymentId, userId, role, dto) {
        const payment = await this.prisma.payment.findUnique({
            where: { id: paymentId },
            include: { session: true },
        });
        if (!payment)
            throw new common_1.NotFoundException('Pago no encontrado');
        const isOwner = payment.clientId === userId;
        const isAdmin = role === client_1.UserRole.admin;
        if (!isOwner && !isAdmin)
            throw new common_1.ForbiddenException();
        if (payment.status === client_1.PaymentStatus.completed) {
            return payment;
        }
        return this.prisma.payment.update({
            where: { id: paymentId },
            data: {
                status: client_1.PaymentStatus.completed,
                externalPaymentId: dto.externalPaymentId,
                externalStatus: dto.externalStatus ?? 'approved',
                paidAt: new Date(),
            },
        });
    }
    async findMine(clientId) {
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
    async refund(paymentId, dto) {
        const payment = await this.prisma.payment.findUnique({
            where: { id: paymentId },
        });
        if (!payment)
            throw new common_1.NotFoundException('Pago no encontrado');
        if (payment.status !== client_1.PaymentStatus.completed) {
            throw new common_1.BadRequestException('Solo se pueden reembolsar pagos completados');
        }
        return this.prisma.payment.update({
            where: { id: paymentId },
            data: {
                status: client_1.PaymentStatus.refunded,
                refundedAt: new Date(),
                refundAmount: dto.amount ?? payment.amount,
                refundReason: dto.reason,
            },
        });
    }
    async payWithWallet(clientId, sessionId, amount) {
        return this.prisma.$transaction(async (tx) => {
            const profile = await tx.clientProfile.findUnique({
                where: { userId: clientId },
            });
            if (!profile) {
                throw new common_1.BadRequestException('El cliente no tiene perfil de wallet');
            }
            if (Number(profile.walletBalance) < amount) {
                throw new common_1.BadRequestException('Saldo insuficiente en wallet');
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
                    method: client_1.PaymentMethod.wallet,
                    status: client_1.PaymentStatus.completed,
                    paidAt: new Date(),
                    externalStatus: 'wallet_paid',
                },
            });
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map