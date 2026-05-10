import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/review.dto';
export declare class ReviewsController {
    private reviewsService;
    constructor(reviewsService: ReviewsService);
    create(clientId: string, sessionId: string, dto: CreateReviewDto): Promise<any>;
    findByTrainer(trainerId: string): Promise<any>;
    findMine(userId: string): Promise<any>;
}
