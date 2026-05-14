import { PrismaService } from '../../prisma/prisma.service';
import { CreateTrainerProfileDto, UpdateTrainerProfileDto, UpdateLocationDto, QueryTrainersDto, CreateCertificationDto, CreateAvailabilityDto, AddSpecialtyDto } from './dto/trainer.dto';
import { FitnessGoal } from '@prisma/client';
export declare class TrainersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: QueryTrainersDto): Promise<{
        data: ({
            user: {
                fullName: string;
                id: string;
                avatarUrl: string | null;
            };
            specialties: {
                goal: import("@prisma/client").$Enums.FitnessGoal;
                trainerId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            bio: string | null;
            yearsExperience: number | null;
            hourlyRate: import("@prisma/client/runtime/library").Decimal;
            modalities: import("@prisma/client").$Enums.Modality[];
            serviceRadiusKm: number;
            locationLabel: string | null;
            tier: import("@prisma/client").$Enums.TrainerTier;
            locationLat: number | null;
            locationLng: number | null;
            totalSessions: number;
            avgRating: import("@prisma/client/runtime/library").Decimal | null;
            totalReviews: number;
            isAvailableNow: boolean;
            lastSeenAt: Date | null;
            premiumExpiresAt: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findNearby(query: QueryTrainersDto): Promise<{
        distanceKm: number;
        user: {
            fullName: string;
            id: string;
            avatarUrl: string | null;
        };
        specialties: {
            goal: import("@prisma/client").$Enums.FitnessGoal;
            trainerId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        yearsExperience: number | null;
        hourlyRate: import("@prisma/client/runtime/library").Decimal;
        modalities: import("@prisma/client").$Enums.Modality[];
        serviceRadiusKm: number;
        locationLabel: string | null;
        tier: import("@prisma/client").$Enums.TrainerTier;
        locationLat: number | null;
        locationLng: number | null;
        totalSessions: number;
        avgRating: import("@prisma/client/runtime/library").Decimal | null;
        totalReviews: number;
        isAvailableNow: boolean;
        lastSeenAt: Date | null;
        premiumExpiresAt: Date | null;
    }[]>;
    findAvailableNow(query: QueryTrainersDto): Promise<{
        distanceKm: number;
        user: {
            fullName: string;
            id: string;
            avatarUrl: string | null;
        };
        specialties: {
            goal: import("@prisma/client").$Enums.FitnessGoal;
            trainerId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        yearsExperience: number | null;
        hourlyRate: import("@prisma/client/runtime/library").Decimal;
        modalities: import("@prisma/client").$Enums.Modality[];
        serviceRadiusKm: number;
        locationLabel: string | null;
        tier: import("@prisma/client").$Enums.TrainerTier;
        locationLat: number | null;
        locationLng: number | null;
        totalSessions: number;
        avgRating: import("@prisma/client/runtime/library").Decimal | null;
        totalReviews: number;
        isAvailableNow: boolean;
        lastSeenAt: Date | null;
        premiumExpiresAt: Date | null;
    }[]>;
    findById(id: string): Promise<{
        user: {
            email: string;
            fullName: string;
            id: string;
            avatarUrl: string | null;
        };
        specialties: {
            goal: import("@prisma/client").$Enums.FitnessGoal;
            trainerId: string;
        }[];
        certifications: {
            id: string;
            createdAt: Date;
            name: string;
            issuedBy: string;
            issuedAt: Date;
            expiresAt: Date | null;
            documentUrl: string | null;
            trainerId: string;
            status: import("@prisma/client").$Enums.CertStatus;
            reviewedAt: Date | null;
            reviewedById: string | null;
        }[];
        availability: {
            id: string;
            day: import("@prisma/client").$Enums.DayOfWeek;
            startTime: string;
            endTime: string;
            trainerId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        yearsExperience: number | null;
        hourlyRate: import("@prisma/client/runtime/library").Decimal;
        modalities: import("@prisma/client").$Enums.Modality[];
        serviceRadiusKm: number;
        locationLabel: string | null;
        tier: import("@prisma/client").$Enums.TrainerTier;
        locationLat: number | null;
        locationLng: number | null;
        totalSessions: number;
        avgRating: import("@prisma/client/runtime/library").Decimal | null;
        totalReviews: number;
        isAvailableNow: boolean;
        lastSeenAt: Date | null;
        premiumExpiresAt: Date | null;
    }>;
    createProfile(userId: string, dto: CreateTrainerProfileDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        yearsExperience: number | null;
        hourlyRate: import("@prisma/client/runtime/library").Decimal;
        modalities: import("@prisma/client").$Enums.Modality[];
        serviceRadiusKm: number;
        locationLabel: string | null;
        tier: import("@prisma/client").$Enums.TrainerTier;
        locationLat: number | null;
        locationLng: number | null;
        totalSessions: number;
        avgRating: import("@prisma/client/runtime/library").Decimal | null;
        totalReviews: number;
        isAvailableNow: boolean;
        lastSeenAt: Date | null;
        premiumExpiresAt: Date | null;
    }>;
    updateProfile(userId: string, dto: UpdateTrainerProfileDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        yearsExperience: number | null;
        hourlyRate: import("@prisma/client/runtime/library").Decimal;
        modalities: import("@prisma/client").$Enums.Modality[];
        serviceRadiusKm: number;
        locationLabel: string | null;
        tier: import("@prisma/client").$Enums.TrainerTier;
        locationLat: number | null;
        locationLng: number | null;
        totalSessions: number;
        avgRating: import("@prisma/client/runtime/library").Decimal | null;
        totalReviews: number;
        isAvailableNow: boolean;
        lastSeenAt: Date | null;
        premiumExpiresAt: Date | null;
    }>;
    updateLocation(userId: string, dto: UpdateLocationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        yearsExperience: number | null;
        hourlyRate: import("@prisma/client/runtime/library").Decimal;
        modalities: import("@prisma/client").$Enums.Modality[];
        serviceRadiusKm: number;
        locationLabel: string | null;
        tier: import("@prisma/client").$Enums.TrainerTier;
        locationLat: number | null;
        locationLng: number | null;
        totalSessions: number;
        avgRating: import("@prisma/client/runtime/library").Decimal | null;
        totalReviews: number;
        isAvailableNow: boolean;
        lastSeenAt: Date | null;
        premiumExpiresAt: Date | null;
    }>;
    toggleAvailability(userId: string, isAvailable: boolean): Promise<{
        isAvailableNow: boolean;
    }>;
    getMyCerts(userId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        issuedBy: string;
        issuedAt: Date;
        expiresAt: Date | null;
        documentUrl: string | null;
        trainerId: string;
        status: import("@prisma/client").$Enums.CertStatus;
        reviewedAt: Date | null;
        reviewedById: string | null;
    }[]>;
    addCert(userId: string, dto: CreateCertificationDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        issuedBy: string;
        issuedAt: Date;
        expiresAt: Date | null;
        documentUrl: string | null;
        trainerId: string;
        status: import("@prisma/client").$Enums.CertStatus;
        reviewedAt: Date | null;
        reviewedById: string | null;
    }>;
    deleteCert(userId: string, certId: string): Promise<{
        message: string;
    }>;
    getAvailability(userId: string): Promise<{
        id: string;
        day: import("@prisma/client").$Enums.DayOfWeek;
        startTime: string;
        endTime: string;
        trainerId: string;
    }[]>;
    addAvailability(userId: string, dto: CreateAvailabilityDto): Promise<{
        id: string;
        day: import("@prisma/client").$Enums.DayOfWeek;
        startTime: string;
        endTime: string;
        trainerId: string;
    }>;
    deleteAvailability(userId: string, availId: string): Promise<{
        message: string;
    }>;
    getSpecialties(userId: string): Promise<{
        goal: import("@prisma/client").$Enums.FitnessGoal;
        trainerId: string;
    }[]>;
    addSpecialty(userId: string, dto: AddSpecialtyDto): Promise<{
        goal: import("@prisma/client").$Enums.FitnessGoal;
        trainerId: string;
    }>;
    deleteSpecialty(userId: string, goal: FitnessGoal): Promise<{
        message: string;
    }>;
    getProfileByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        yearsExperience: number | null;
        hourlyRate: import("@prisma/client/runtime/library").Decimal;
        modalities: import("@prisma/client").$Enums.Modality[];
        serviceRadiusKm: number;
        locationLabel: string | null;
        tier: import("@prisma/client").$Enums.TrainerTier;
        locationLat: number | null;
        locationLng: number | null;
        totalSessions: number;
        avgRating: import("@prisma/client/runtime/library").Decimal | null;
        totalReviews: number;
        isAvailableNow: boolean;
        lastSeenAt: Date | null;
        premiumExpiresAt: Date | null;
    }>;
}
