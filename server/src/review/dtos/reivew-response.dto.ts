import { Exclude, Expose } from 'class-transformer';
import { Category } from 'src/category/category.entity';
import { Like } from 'src/like/like.entity';
import { Review } from 'src/review/review.entity';

export class ReviewResponseDto {
  constructor(partial: Partial<ReviewResponseDto>) {
    Object.assign(this, partial);
  }
  id: number;
  comment: string;
  userId: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
}
