import { Modality, FitnessGoal, DayOfWeek } from '@prisma/client';
export declare class CreateTrainerProfileDto {
    bio?: string;
    yearsExperience?: number;
    hourlyRate: number;
    modalities?: Modality[];
    serviceRadiusKm?: number;
}
export declare class UpdateTrainerProfileDto extends CreateTrainerProfileDto {
}
export declare class UpdateLocationDto {
    lat: number;
    lng: number;
    locationLabel?: string;
}
export declare class QueryTrainersDto {
    lat?: number;
    lng?: number;
    radiusKm?: number;
    goal?: FitnessGoal;
    modality?: Modality;
    maxPrice?: number;
    minRating?: number;
    page?: number;
    limit?: number;
}
export declare class CreateCertificationDto {
    name: string;
    issuedBy: string;
    issuedAt: string;
    expiresAt?: string;
    documentUrl?: string;
}
export declare class CreateAvailabilityDto {
    day: DayOfWeek;
    startTime: string;
    endTime: string;
}
export declare class AddSpecialtyDto {
    goal: FitnessGoal;
}
