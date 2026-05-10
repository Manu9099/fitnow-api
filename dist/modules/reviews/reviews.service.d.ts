import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/review.dto';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(clientId: string, sessionId: string, dto: CreateReviewDto): Promise<any>;
    findByTrainer(trainerId: string): Promise<any>;
    findMine(trainerId: string): Promise<any>;
}
