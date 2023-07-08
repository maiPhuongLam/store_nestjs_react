export class CartResponseDto {
  constructor(partial: Partial<CartResponseDto>) {
    Object.assign(this, partial);
  }

  id: number;
  userId: number;
}
