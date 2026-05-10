import {
  Injectable, NotFoundException, ConflictException, ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateTrainerProfileDto, UpdateTrainerProfileDto, UpdateLocationDto,
  QueryTrainersDto, CreateCertificationDto, CreateAvailabilityDto, AddSpecialtyDto,
} from './dto/trainer.dto';
import { FitnessGoal } from '@prisma/client';

@Injectable()
export class TrainersService {
  constructor(private prisma: PrismaService) {}

  // ── Listado y búsqueda ───────────────────────────────────────────────────

  async findAll(query: QueryTrainersDto) {
    const { goal, modality, maxPrice, minRating, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = { user: { isActive: true } };
    if (goal)      where.specialties = { some: { goal } };
    if (modality)  where.modalities  = { has: modality };
    if (maxPrice)  where.hourlyRate  = { lte: maxPrice };
    if (minRating) where.avgRating   = { gte: minRating };

    const [trainers, total] = await Promise.all([
      this.prisma.trainerProfile.findMany({
        where,
        include: {
          user:       { select: { id: true, fullName: true, avatarUrl: true } },
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

  async findNearby(query: QueryTrainersDto) {
    const { lat, lng, radiusKm = 10, goal, modality } = query;

    // Cálculo de distancia con fórmula de Haversine en memoria
    // En producción usa PostGIS con $queryRaw para mayor eficiencia
    const where: any = { isAvailableNow: true, user: { isActive: true } };
    if (goal)     where.specialties = { some: { goal } };
    if (modality) where.modalities  = { has: modality };

    const trainers = await this.prisma.trainerProfile.findMany({
      where,
      include: {
        user:        { select: { id: true, fullName: true, avatarUrl: true } },
        specialties: true,
      },
    });

    const withDistance = trainers
      .filter(t => t.locationLat && t.locationLng)
      .map(t => ({
        ...t,
        distanceKm: haversine(lat!, lng!, t.locationLat!, t.locationLng!),
      }))
      .filter(t => t.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return withDistance;
  }

  async findAvailableNow(query: QueryTrainersDto) {
    return this.findNearby({ ...query });
  }

  async findById(id: string) {
    const trainer = await this.prisma.trainerProfile.findUnique({
      where:   { id },
      include: {
        user:          { select: { id: true, fullName: true, avatarUrl: true, email: true } },
        specialties:   true,
        certifications: { where: { status: 'verified' } },
        availability:  true,
      },
    });
    if (!trainer) throw new NotFoundException('Trainer no encontrado');
    return trainer;
  }

  // ── Perfil ────────────────────────────────────────────────────────────────

  async createProfile(userId: string, dto: CreateTrainerProfileDto) {
    const exists = await this.prisma.trainerProfile.findUnique({ where: { userId } });
    if (exists) throw new ConflictException('Ya tienes un perfil de trainer');

    return this.prisma.trainerProfile.create({
      data: { ...dto, hourlyRate: dto.hourlyRate, userId },
    });
  }

  async updateProfile(userId: string, dto: UpdateTrainerProfileDto) {
    const profile = await this.prisma.trainerProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Perfil no encontrado');

    return this.prisma.trainerProfile.update({
      where: { userId },
      data:  dto,
    });
  }

  async updateLocation(userId: string, dto: UpdateLocationDto) {
    return this.prisma.trainerProfile.update({
      where: { userId },
      data: {
        locationLat:   dto.lat,
        locationLng:   dto.lng,
        locationLabel: dto.locationLabel,
        lastSeenAt:    new Date(),
      },
    });
  }

  async toggleAvailability(userId: string, isAvailable: boolean) {
    return this.prisma.trainerProfile.update({
      where: { userId },
      data: { isAvailableNow: isAvailable, lastSeenAt: new Date() },
      select: { isAvailableNow: true },
    });
  }

  // ── Certificaciones ───────────────────────────────────────────────────────

  async getMyCerts(userId: string) {
    const profile = await this.getProfileByUserId(userId);
    return this.prisma.certification.findMany({ where: { trainerId: profile.id } });
  }

  async addCert(userId: string, dto: CreateCertificationDto) {
    const profile = await this.getProfileByUserId(userId);
    return this.prisma.certification.create({
      data: { ...dto, trainerId: profile.id, issuedAt: new Date(dto.issuedAt) },
    });
  }

  async deleteCert(userId: string, certId: string) {
    const profile = await this.getProfileByUserId(userId);
    const cert = await this.prisma.certification.findUnique({ where: { id: certId } });
    if (!cert || cert.trainerId !== profile.id) throw new NotFoundException();
    await this.prisma.certification.delete({ where: { id: certId } });
    return { message: 'Certificación eliminada' };
  }

  // ── Disponibilidad ────────────────────────────────────────────────────────

  async getAvailability(userId: string) {
    const profile = await this.getProfileByUserId(userId);
    return this.prisma.trainerAvailability.findMany({ where: { trainerId: profile.id } });
  }

  async addAvailability(userId: string, dto: CreateAvailabilityDto) {
    const profile = await this.getProfileByUserId(userId);
    return this.prisma.trainerAvailability.create({
      data: { ...dto, trainerId: profile.id },
    });
  }

  async deleteAvailability(userId: string, availId: string) {
    const profile = await this.getProfileByUserId(userId);
    const slot = await this.prisma.trainerAvailability.findUnique({ where: { id: availId } });
    if (!slot || slot.trainerId !== profile.id) throw new NotFoundException();
    await this.prisma.trainerAvailability.delete({ where: { id: availId } });
    return { message: 'Horario eliminado' };
  }

  // ── Especialidades ────────────────────────────────────────────────────────

  async getSpecialties(userId: string) {
    const profile = await this.getProfileByUserId(userId);
    return this.prisma.trainerSpecialty.findMany({ where: { trainerId: profile.id } });
  }

  async addSpecialty(userId: string, dto: AddSpecialtyDto) {
    const profile = await this.getProfileByUserId(userId);
    return this.prisma.trainerSpecialty.upsert({
      where:  { trainerId_goal: { trainerId: profile.id, goal: dto.goal } },
      update: {},
      create: { trainerId: profile.id, goal: dto.goal },
    });
  }

  async deleteSpecialty(userId: string, goal: FitnessGoal) {
    const profile = await this.getProfileByUserId(userId);
    await this.prisma.trainerSpecialty.delete({
      where: { trainerId_goal: { trainerId: profile.id, goal } },
    });
    return { message: 'Especialidad eliminada' };
  }

  // ── Helper privado ────────────────────────────────────────────────────────

  async getProfileByUserId(userId: string) {
    const profile = await this.prisma.trainerProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Perfil de trainer no encontrado');
    return profile;
  }
}

// Haversine distance en km
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function toRad(deg: number) { return (deg * Math.PI) / 180; }
