import { Exclude, Expose } from 'class-transformer';
import { Category } from 'src/category/category.entity';
import { Like } from 'src/like/like.entity';
import { Review } from 'src/review/review.entity';

export class ProductResponseDto {
  constructor(partial: Partial<ProductResponseDto>) {
    Object.assign(this, partial);
  }
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  quantity: number;
  image: string;
  category: Category;
  reviews: Review[];
  likes: Like[];
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  categoryId: number;
}
