import { PrismaService } from '../../prisma/prisma.service';
import { UpdateClientProfileDto } from './dto/client-profile.dto';
export declare class ClientProfilesService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        goals: import("@prisma/client").$Enums.FitnessGoal[];
        fitnessLevel: string | null;
        injuriesNotes: string | null;
        preferredModalities: import("@prisma/client").$Enums.Modality[];
        walletBalance: import("@prisma/client/runtime/library").Decimal;
        userId: string;
    }>;
    updateProfile(userId: string, dto: UpdateClientProfileDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        goals: import("@prisma/client").$Enums.FitnessGoal[];
        fitnessLevel: string | null;
        injuriesNotes: string | null;
        preferredModalities: import("@prisma/client").$Enums.Modality[];
        walletBalance: import("@prisma/client/runtime/library").Decimal;
        userId: string;
    }>;
    getWallet(userId: string): Promise<{
        walletBalance: import("@prisma/client/runtime/library").Decimal;
    }>;
    topUpWallet(userId: string, amount: number): Promise<{
        message: string;
        walletBalance: import("@prisma/client/runtime/library").Decimal;
    }>;
    private getOrCreateProfile;
}
