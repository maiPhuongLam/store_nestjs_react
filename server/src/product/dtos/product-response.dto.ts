import { Exclude, Expose } from 'class-transformer';

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
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  userId: number;
  @Exclude()
  categoryId: number;
}
