import { Exclude } from 'class-transformer';

export class AuthResponseDto {
  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }
  email: string;

  @Exclude()
  password: string;

  firstName: string;
  lastName: string;
  address: string;
  phone: string;

  @Exclude()
  createdDate: Date;
  @Exclude()
  updatedDate: Date;
}
