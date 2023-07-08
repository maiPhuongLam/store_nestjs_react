import { IsIn, IsInt, IsNotEmpty } from 'class-validator';
import { Cart } from '../cart.entity';
import { Product } from 'src/product/product.entity';

export class CreateCartItemDto {
  @IsNotEmpty()
  productId: number;
}
