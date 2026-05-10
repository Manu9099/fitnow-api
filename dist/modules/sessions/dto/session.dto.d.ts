import { Modality } from '@prisma/client';
export declare class CreateSessionDto {
    trainerId: string;
    scheduledAt: string;
    durationMinutes?: number;
    modality: Modality;
    locationLat?: number;
    locationLng?: number;
    locationLabel?: string;
    notes?: string;
    isOnDemand?: boolean;
}
export declare class CancelSessionDto {
    reason: string;
}
export declare class QuerySessionsDto {
    status?: string;
    page?: number;
    limit?: number;
}
