import { FitnessGoal, Modality } from '@prisma/client';
export declare class UpdateClientProfileDto {
    goals?: FitnessGoal[];
    fitnessLevel?: string;
    injuriesNotes?: string;
    preferredModalities?: Modality[];
}
export declare class WalletTopUpDto {
    amount: number;
}
