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
exports.TrainersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TrainersService = class TrainersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { goal, modality, maxPrice, minRating, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const where = { user: { isActive: true } };
        if (goal)
            where.specialties = { some: { goal } };
        if (modality)
            where.modalities = { has: modality };
        if (maxPrice)
            where.hourlyRate = { lte: maxPrice };
        if (minRating)
            where.avgRating = { gte: minRating };
        const [trainers, total] = await Promise.all([
            this.prisma.trainerProfile.findMany({
                where,
                include: {
                    user: { select: { id: true, fullName: true, avatarUrl: true } },
                    specialties: true,
                },
                orderBy: [{ tier: 'desc' }, { avgRating: 'desc' }],
                skip,
                take: limit,
            }),
            this.prisma.trainerProfile.count({ where }),
        ]);
        return { data: trainers, total, page, limit };
    }
    async findNearby(query) {
        const { lat, lng, radiusKm = 10, goal, modality } = query;
        const where = { isAvailableNow: true, user: { isActive: true } };
        if (goal)
            where.specialties = { some: { goal } };
        if (modality)
            where.modalities = { has: modality };
        const trainers = await this.prisma.trainerProfile.findMany({
            where,
            include: {
                user: { select: { id: true, fullName: true, avatarUrl: true } },
                specialties: true,
            },
        });
        const withDistance = trainers
            .filter(t => t.locationLat && t.locationLng)
            .map(t => ({
            ...t,
            distanceKm: haversine(lat, lng, t.locationLat, t.locationLng),
        }))
            .filter(t => t.distanceKm <= radiusKm)
            .sort((a, b) => a.distanceKm - b.distanceKm);
        return withDistance;
    }
    async findAvailableNow(query) {
        return this.findNearby({ ...query });
    }
    async findById(id) {
        const trainer = await this.prisma.trainerProfile.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, fullName: true, avatarUrl: true, email: true } },
                specialties: true,
                certifications: { where: { status: 'verified' } },
                availability: true,
            },
        });
        if (!trainer)
            throw new common_1.NotFoundException('Trainer no encontrado');
        return trainer;
    }
    async createProfile(userId, dto) {
        const exists = await this.prisma.trainerProfile.findUnique({ where: { userId } });
        if (exists)
            throw new common_1.ConflictException('Ya tienes un perfil de trainer');
        return this.prisma.trainerProfile.create({
            data: { ...dto, hourlyRate: dto.hourlyRate, userId },
        });
    }
    async updateProfile(userId, dto) {
        const profile = await this.prisma.trainerProfile.findUnique({ where: { userId } });
        if (!profile)
            throw new common_1.NotFoundException('Perfil no encontrado');
        return this.prisma.trainerProfile.update({
            where: { userId },
            data: dto,
        });
    }
    async updateLocation(userId, dto) {
        return this.prisma.trainerProfile.update({
            where: { userId },
            data: {
                locationLat: dto.lat,
                locationLng: dto.lng,
                locationLabel: dto.locationLabel,
                lastSeenAt: new Date(),
            },
        });
    }
    async toggleAvailability(userId, isAvailable) {
        return this.prisma.trainerProfile.update({
            where: { userId },
            data: { isAvailableNow: isAvailable, lastSeenAt: new Date() },
            select: { isAvailableNow: true },
        });
    }
    async getMyCerts(userId) {
        const profile = await this.getProfileByUserId(userId);
        return this.prisma.certification.findMany({ where: { trainerId: profile.id } });
    }
    async addCert(userId, dto) {
        const profile = await this.getProfileByUserId(userId);
        return this.prisma.certification.create({
            data: { ...dto, trainerId: profile.id, issuedAt: new Date(dto.issuedAt) },
        });
    }
    async deleteCert(userId, certId) {
        const profile = await this.getProfileByUserId(userId);
        const cert = await this.prisma.certification.findUnique({ where: { id: certId } });
        if (!cert || cert.trainerId !== profile.id)
            throw new common_1.NotFoundException();
        await this.prisma.certification.delete({ where: { id: certId } });
        return { message: 'Certificación eliminada' };
    }
    async getAvailability(userId) {
        const profile = await this.getProfileByUserId(userId);
        return this.prisma.trainerAvailability.findMany({ where: { trainerId: profile.id } });
    }
    async addAvailability(userId, dto) {
        const profile = await this.getProfileByUserId(userId);
        return this.prisma.trainerAvailability.create({
            data: { ...dto, trainerId: profile.id },
        });
    }
    async deleteAvailability(userId, availId) {
        const profile = await this.getProfileByUserId(userId);
        const slot = await this.prisma.trainerAvailability.findUnique({ where: { id: availId } });
        if (!slot || slot.trainerId !== profile.id)
            throw new common_1.NotFoundException();
        await this.prisma.trainerAvailability.delete({ where: { id: availId } });
        return { message: 'Horario eliminado' };
    }
    async getSpecialties(userId) {
        const profile = await this.getProfileByUserId(userId);
        return this.prisma.trainerSpecialty.findMany({ where: { trainerId: profile.id } });
    }
    async addSpecialty(userId, dto) {
        const profile = await this.getProfileByUserId(userId);
        return this.prisma.trainerSpecialty.upsert({
            where: { trainerId_goal: { trainerId: profile.id, goal: dto.goal } },
            update: {},
            create: { trainerId: profile.id, goal: dto.goal },
        });
    }
    async deleteSpecialty(userId, goal) {
        const profile = await this.getProfileByUserId(userId);
        await this.prisma.trainerSpecialty.delete({
            where: { trainerId_goal: { trainerId: profile.id, goal } },
        });
        return { message: 'Especialidad eliminada' };
    }
    async getProfileByUserId(userId) {
        const profile = await this.prisma.trainerProfile.findUnique({ where: { userId } });
        if (!profile)
            throw new common_1.NotFoundException('Perfil de trainer no encontrado');
        return profile;
    }
};
exports.TrainersService = TrainersService;
exports.TrainersService = TrainersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrainersService);
function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function toRad(deg) { return (deg * Math.PI) / 180; }
//# sourceMappingURL=trainers.service.js.map