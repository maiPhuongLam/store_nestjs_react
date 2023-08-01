import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { ReviewResponseDto } from './dtos/reivew-response.dto';

interface CreateReviewParams {
  comment: string;
  userId: number;
  productId: number;
}

interface UpdateReviewParams {
  comment?: string;
  userId?: number;
  productId?: number;
}
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async createReivew(data: CreateReviewParams): Promise<ReviewResponseDto> {
    const review = await this.reviewRepository.create(data);
    return new ReviewResponseDto(review);
  }

  async getReview(id: number): Promise<ReviewResponseDto> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    return new ReviewResponseDto(review);
  }

  async getReviews(): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewRepository.find({
      relations: { user: true },
      take: 5,
    });
    return reviews.map((review) => {
      return new ReviewResponseDto(review);
    });
  }

  async updateReview(
    id: number,
    data: UpdateReviewParams,
  ): Promise<ReviewResponseDto> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!review) {
      throw new NotFoundException();
    }
    await this.reviewRepository.update(id, data);
    await this.reviewRepository.save(review);
    return this.getReview(review.id);
  }

  async deleteReview(id: number): Promise<string> {
    const review = await this.getReview(id);
    await this.reviewRepository.delete(review.id);
    return 'Delete success';
  }
}
