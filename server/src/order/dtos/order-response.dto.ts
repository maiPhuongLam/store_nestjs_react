import { Exclude, Expose } from 'class-transformer';

export class OrderResponseDto {
  constructor(partial: Partial<OrderResponseDto>) {
    Object.assign(this, partial);
  }
  id: number;
  totalAmount: number;
  paymentMethos: string;
  deliveryAddressId: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  userId: number;
  @Exclude()
  cartId: number;
}
