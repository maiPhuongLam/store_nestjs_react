import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}
