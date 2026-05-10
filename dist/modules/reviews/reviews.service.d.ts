import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/review.dto';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(clientId: string, sessionId: string, dto: CreateReviewDto): Promise<{
        id: string;
        createdAt: Date;
        isPublic: boolean;
        trainerId: string;
        clientId: string;
        sessionId: string;
        rating: number;
        comment: string | null;
    }>;
    findByTrainer(trainerId: string): Promise<({
        client: {
            fullName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        isPublic: boolean;
        trainerId: string;
        clientId: string;
        sessionId: string;
        rating: number;
        comment: string | null;
    })[]>;
    findMine(trainerId: string): Promise<({
        client: {
            fullName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        isPublic: boolean;
        trainerId: string;
        clientId: string;
        sessionId: string;
        rating: number;
        comment: string | null;
    })[]>;
}
