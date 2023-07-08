import { Exclude, Expose } from 'class-transformer';

export class CategoryResponseDto {
  constructor(partial: Partial<CategoryResponseDto>) {
    Object.assign(this, partial);
  }
  id: number;
  name: string;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}
