import { PrismaService } from '../../prisma/prisma.service';
import { CreateTrainerProfileDto, UpdateTrainerProfileDto, UpdateLocationDto, QueryTrainersDto, CreateCertificationDto, CreateAvailabilityDto, AddSpecialtyDto } from './dto/trainer.dto';
import { FitnessGoal } from '@prisma/client';
export declare class TrainersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: QueryTrainersDto): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    findNearby(query: QueryTrainersDto): Promise<any>;
    findAvailableNow(query: QueryTrainersDto): Promise<any>;
    findById(id: string): Promise<any>;
    createProfile(userId: string, dto: CreateTrainerProfileDto): Promise<any>;
    updateProfile(userId: string, dto: UpdateTrainerProfileDto): Promise<any>;
    updateLocation(userId: string, dto: UpdateLocationDto): Promise<any>;
    toggleAvailability(userId: string, isAvailable: boolean): Promise<any>;
    getMyCerts(userId: string): Promise<any>;
    addCert(userId: string, dto: CreateCertificationDto): Promise<any>;
    deleteCert(userId: string, certId: string): Promise<{
        message: string;
    }>;
    getAvailability(userId: string): Promise<any>;
    addAvailability(userId: string, dto: CreateAvailabilityDto): Promise<any>;
    deleteAvailability(userId: string, availId: string): Promise<{
        message: string;
    }>;
    getSpecialties(userId: string): Promise<any>;
    addSpecialty(userId: string, dto: AddSpecialtyDto): Promise<any>;
    deleteSpecialty(userId: string, goal: FitnessGoal): Promise<{
        message: string;
    }>;
    getProfileByUserId(userId: string): Promise<any>;
}
