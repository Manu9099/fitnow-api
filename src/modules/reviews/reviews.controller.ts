import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/review.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Reviews')
@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post('sessions/:sessionId')
  @Roles(UserRole.client)
  @ApiOperation({ summary: 'Calificar sesión completada' })
  create(
    @CurrentUser('id') clientId: string,
    @Param('sessionId') sessionId: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.create(clientId, sessionId, dto);
  }

  @Public()
  @Get('trainers/:trainerId')
  @ApiOperation({ summary: 'Reseñas públicas de un trainer' })
  findByTrainer(@Param('trainerId') trainerId: string) {
    return this.reviewsService.findByTrainer(trainerId);
  }

  @Get('me')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Reseñas recibidas (trainer)' })
  findMine(@CurrentUser('id') userId: string) {
    return this.reviewsService.findMine(userId);
  }
}
