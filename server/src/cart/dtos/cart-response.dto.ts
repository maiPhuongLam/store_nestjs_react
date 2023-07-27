import { Exclude } from 'class-transformer';

export class CartResponseDto {
  constructor(partial: Partial<CartResponseDto>) {
    Object.assign(this, partial);
  }

  id: number;
  userId: number;
  @Exclude()
  createdDate: Date;
  @Exclude()
  updatedDate: Date;
}
