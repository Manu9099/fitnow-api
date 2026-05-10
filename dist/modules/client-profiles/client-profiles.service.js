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
exports.ClientProfilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ClientProfilesService = class ClientProfilesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
        return this.getOrCreateProfile(userId);
    }
    async updateProfile(userId, dto) {
        await this.getOrCreateProfile(userId);
        return this.prisma.clientProfile.update({
            where: { userId },
            data: dto,
        });
    }
    async getWallet(userId) {
        const profile = await this.getOrCreateProfile(userId);
        return {
            walletBalance: profile.walletBalance,
        };
    }
    async topUpWallet(userId, amount) {
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
    async getOrCreateProfile(userId) {
        const existing = await this.prisma.clientProfile.findUnique({
            where: { userId },
        });
        if (existing)
            return existing;
        return this.prisma.clientProfile.create({
            data: {
                userId,
                goals: [],
                preferredModalities: [],
            },
        });
    }
};
exports.ClientProfilesService = ClientProfilesService;
exports.ClientProfilesService = ClientProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientProfilesService);
//# sourceMappingURL=client-profiles.service.js.map