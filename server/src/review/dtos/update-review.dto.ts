import { IsInt, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  comment: string;

  @IsOptional()
  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt()
  productId: number;
}
