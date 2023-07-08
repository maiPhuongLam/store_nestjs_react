import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { PaymentMethod } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsInt()
  totalAmount: number;

  @IsNotEmpty()
  @IsInt()
  deliveryAddressId: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
