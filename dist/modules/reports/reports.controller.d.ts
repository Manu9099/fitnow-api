import { CreateReportDto } from './dto/report.dto';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    create(reporterId: string, dto: CreateReportDto): Promise<{
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
    }>;
    findMine(reporterId: string): Promise<({
        session: {
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
        } | null;
        reportedUser: {
            fullName: string;
            role: import("@prisma/client").$Enums.UserRole;
            id: string;
            avatarUrl: string | null;
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
}
