import { UserRole } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CheckoutPaymentDto, ConfirmPaymentDto, RefundPaymentDto } from './dto/payment.dto';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    checkout(clientId: string, sessionId: string, dto: CheckoutPaymentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PaymentStatus;
        clientId: string;
        sessionId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        method: import("@prisma/client").$Enums.PaymentMethod;
        externalPaymentId: string | null;
        externalStatus: string | null;
        paidAt: Date | null;
        refundedAt: Date | null;
        refundAmount: import("@prisma/client/runtime/library").Decimal | null;
        refundReason: string | null;
    }>;
    confirm(paymentId: string, userId: string, role: UserRole, dto: ConfirmPaymentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PaymentStatus;
        clientId: string;
        sessionId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        method: import("@prisma/client").$Enums.PaymentMethod;
        externalPaymentId: string | null;
        externalStatus: string | null;
        paidAt: Date | null;
        refundedAt: Date | null;
        refundAmount: import("@prisma/client/runtime/library").Decimal | null;
        refundReason: string | null;
    }>;
    findMine(clientId: string): Promise<({
        session: {
            trainer: {
                user: {
                    fullName: string;
                    avatarUrl: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                bio: string | null;
                yearsExperience: number | null;
                hourlyRate: import("@prisma/client/runtime/library").Decimal;
                modalities: import("@prisma/client").$Enums.Modality[];
                serviceRadiusKm: number;
                locationLabel: string | null;
                userId: string;
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PaymentStatus;
        clientId: string;
        sessionId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        method: import("@prisma/client").$Enums.PaymentMethod;
        externalPaymentId: string | null;
        externalStatus: string | null;
        paidAt: Date | null;
        refundedAt: Date | null;
        refundAmount: import("@prisma/client/runtime/library").Decimal | null;
        refundReason: string | null;
    })[]>;
    refund(paymentId: string, dto: RefundPaymentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PaymentStatus;
        clientId: string;
        sessionId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        method: import("@prisma/client").$Enums.PaymentMethod;
        externalPaymentId: string | null;
        externalStatus: string | null;
        paidAt: Date | null;
        refundedAt: Date | null;
        refundAmount: import("@prisma/client/runtime/library").Decimal | null;
        refundReason: string | null;
    }>;
    private payWithWallet;
}
