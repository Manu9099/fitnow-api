import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllUsers(page?: number, limit?: number): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        fullName: string;
        role: import("@prisma/client").$Enums.UserRole;
        id: string;
        isActive: boolean;
        createdAt: Date;
    }[]>;
    banUser(id: string): Promise<{
        email: string;
        id: string;
        isActive: boolean;
    }>;
    findPendingCerts(): import("@prisma/client").Prisma.PrismaPromise<({
        trainer: {
            user: {
                fullName: string;
            };
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
        };
    } & {
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
    })[]>;
    verifyCert(certId: string, adminId: string, approve: boolean): Promise<{
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
    findAllSessions(page?: number, limit?: number): import("@prisma/client").Prisma.PrismaPromise<({
        trainer: {
            user: {
                fullName: string;
            };
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
        };
    } & {
        trainerPayout: import("@prisma/client/runtime/library").Decimal;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        locationLabel: string | null;
        modality: import("@prisma/client").$Enums.Modality;
        locationLat: number | null;
        locationLng: number | null;
        trainerId: string;
        status: import("@prisma/client").$Enums.SessionStatus;
        scheduledAt: Date;
        durationMinutes: number;
        notes: string | null;
        isOnDemand: boolean;
        basePrice: import("@prisma/client/runtime/library").Decimal;
        platformFee: import("@prisma/client/runtime/library").Decimal;
        cancellationReason: string | null;
        cancelledAt: Date | null;
        requestExpiresAt: Date | null;
        clientId: string;
        cancelledById: string | null;
    })[]>;
    findAllReports(): import("@prisma/client").Prisma.PrismaPromise<({
        reporter: {
            fullName: string;
        };
        reportedUser: {
            fullName: string;
        };
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        reason: string;
        sessionId: string | null;
        reporterId: string;
        reportedUserId: string;
        isResolved: boolean;
        resolvedById: string | null;
        resolvedAt: Date | null;
    })[]>;
    resolveReport(reportId: string, adminId: string): import("@prisma/client").Prisma.Prisma__ReportClient<{
        description: string | null;
        id: string;
        createdAt: Date;
        reason: string;
        sessionId: string | null;
        reporterId: string;
        reportedUserId: string;
        isResolved: boolean;
        resolvedById: string | null;
        resolvedAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
