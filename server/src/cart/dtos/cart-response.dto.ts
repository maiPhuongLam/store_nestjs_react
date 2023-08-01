import { Exclude } from 'class-transformer';
import { CartItem } from '../cart-item.entity';

export class CartResponseDto {
  constructor(partial: Partial<CartResponseDto>) {
    Object.assign(this, partial);
  }

  id: number;
  userId: number;
  cartItems: CartItem[];
  @Exclude()
  createdDate: Date;
  @Exclude()
  updatedDate: Date;
}
