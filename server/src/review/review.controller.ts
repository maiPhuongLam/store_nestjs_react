import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { ReviewResponseDto } from './dtos/reivew-response.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReviews(): Promise<ReviewResponseDto[]> {
    return this.reviewService.getReviews();
  }

  @Post()
  async createReview(
    @Body() data: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    return this.reviewService.createReivew(data);
  }

  @Put(':id')
  async updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateReviewDto,
  ): Promise<ReviewResponseDto> {
    return this.reviewService.updateReview(id, data);
  }

  @Delete(':id')
  async deleteReview(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.reviewService.deleteReview(id);
  }
}
