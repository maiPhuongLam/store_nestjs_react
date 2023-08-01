import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  productId: number;
}
