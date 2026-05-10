import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/review.dto';
export declare class ReviewsController {
    private reviewsService;
    constructor(reviewsService: ReviewsService);
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
    findMine(userId: string): Promise<({
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
