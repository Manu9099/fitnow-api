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
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const config_1 = require("@nestjs/config");
const PLATFORM_FEE = 0.20;
let SessionsService = class SessionsService {
    prisma;
    config;
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async create(clientId, dto) {
        const trainer = await this.prisma.trainerProfile.findUnique({
            where: { id: dto.trainerId },
        });
        if (!trainer)
            throw new common_1.NotFoundException('Trainer no encontrado');
        const basePrice = Number(trainer.hourlyRate) * (dto.durationMinutes ?? 60) / 60;
        const platformFee = Number((basePrice * PLATFORM_FEE).toFixed(2));
        const trainerPayout = Number((basePrice - platformFee).toFixed(2));
        const requestExpiresAt = dto.isOnDemand
            ? new Date(Date.now() + 10 * 60 * 1000)
            : undefined;
        return this.prisma.session.create({
            data: {
                clientId,
                trainerId: dto.trainerId,
                scheduledAt: new Date(dto.scheduledAt),
                durationMinutes: dto.durationMinutes ?? 60,
                modality: dto.modality,
                locationLat: dto.locationLat,
                locationLng: dto.locationLng,
                locationLabel: dto.locationLabel,
                notes: dto.notes,
                isOnDemand: dto.isOnDemand ?? false,
                requestExpiresAt,
                basePrice,
                platformFee,
                trainerPayout,
            },
            include: { trainer: { include: { user: { select: { fullName: true } } } } },
        });
    }
    async findMine(userId, role, query) {
        const { status, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const where = role === client_1.UserRole.trainer
            ? { trainer: { userId } }
            : { clientId: userId };
        if (status)
            where.status = status;
        const [sessions, total] = await Promise.all([
            this.prisma.session.findMany({
                where,
                include: {
                    trainer: { include: { user: { select: { fullName: true, avatarUrl: true } } } },
                    payment: { select: { status: true, method: true } },
                    review: { select: { rating: true } },
                },
                orderBy: { scheduledAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.session.count({ where }),
        ]);
        return { data: sessions, total, page, limit };
    }
    async findById(id, userId, role) {
        const session = await this.prisma.session.findUnique({
            where: { id },
            include: {
                trainer: { include: { user: { select: { fullName: true, avatarUrl: true, phone: true } } } },
                payment: true,
                review: true,
            },
        });
        if (!session)
            throw new common_1.NotFoundException('Sesión no encontrada');
        const isClient = session.clientId === userId;
        const isTrainer = session.trainer.userId === userId;
        const isAdmin = role === client_1.UserRole.admin;
        if (!isClient && !isTrainer && !isAdmin)
            throw new common_1.ForbiddenException();
        return session;
    }
    async confirm(sessionId, userId) {
        const session = await this.getSessionForTrainer(sessionId, userId);
        this.assertStatus(session.status, client_1.SessionStatus.pending);
        return this.updateStatus(sessionId, client_1.SessionStatus.confirmed);
    }
    async start(sessionId, userId) {
        const session = await this.getSessionForTrainer(sessionId, userId);
        this.assertStatus(session.status, client_1.SessionStatus.confirmed);
        return this.updateStatus(sessionId, client_1.SessionStatus.in_progress);
    }
    async complete(sessionId, userId) {
        const session = await this.getSessionForTrainer(sessionId, userId);
        this.assertStatus(session.status, client_1.SessionStatus.in_progress);
        await this.prisma.trainerProfile.update({
            where: { id: session.trainerId },
            data: { totalSessions: { increment: 1 } },
        });
        return this.updateStatus(sessionId, client_1.SessionStatus.completed);
    }
    async cancel(sessionId, userId, dto) {
        const session = await this.prisma.session.findUnique({ where: { id: sessionId } });
        if (!session)
            throw new common_1.NotFoundException();
        const trainer = await this.prisma.trainerProfile.findUnique({ where: { id: session.trainerId } });
        const isOwner = session.clientId === userId || trainer?.userId === userId;
        if (!isOwner)
            throw new common_1.ForbiddenException();
        if ([client_1.SessionStatus.completed, client_1.SessionStatus.cancelled].includes(session.status)) {
            throw new common_1.BadRequestException('Esta sesión no puede cancelarse');
        }
        return this.prisma.session.update({
            where: { id: sessionId },
            data: {
                status: client_1.SessionStatus.cancelled,
                cancellationReason: dto.reason,
                cancelledById: userId,
                cancelledAt: new Date(),
            },
        });
    }
    async findUpcoming(userId, role) {
        const where = role === client_1.UserRole.trainer
            ? { trainer: { userId }, scheduledAt: { gt: new Date() } }
            : { clientId: userId, scheduledAt: { gt: new Date() } };
        where.status = { in: [client_1.SessionStatus.pending, client_1.SessionStatus.confirmed] };
        return this.prisma.session.findMany({
            where,
            include: { trainer: { include: { user: { select: { fullName: true, avatarUrl: true } } } } },
            orderBy: { scheduledAt: 'asc' },
            take: 10,
        });
    }
    async findHistory(userId, role) {
        const where = role === client_1.UserRole.trainer
            ? { trainer: { userId }, status: client_1.SessionStatus.completed }
            : { clientId: userId, status: client_1.SessionStatus.completed };
        return this.prisma.session.findMany({
            where,
            include: {
                trainer: { include: { user: { select: { fullName: true } } } },
                review: { select: { rating: true, comment: true } },
            },
            orderBy: { scheduledAt: 'desc' },
        });
    }
    async getSessionForTrainer(sessionId, userId) {
        const session = await this.prisma.session.findUnique({
            where: { id: sessionId },
            include: { trainer: true },
        });
        if (!session)
            throw new common_1.NotFoundException('Sesión no encontrada');
        if (session.trainer.userId !== userId)
            throw new common_1.ForbiddenException();
        return session;
    }
    assertStatus(current, expected) {
        if (current !== expected)
            throw new common_1.BadRequestException(`La sesión debe estar en estado '${expected}'`);
    }
    updateStatus(id, status) {
        return this.prisma.session.update({ where: { id }, data: { status } });
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], SessionsService);
//# sourceMappingURL=sessions.service.js.map