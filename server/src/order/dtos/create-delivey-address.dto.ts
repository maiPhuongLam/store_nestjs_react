import { IsNotEmpty } from 'class-validator';

export class CreateDeliveryAddressDto {
  @IsNotEmpty()
  apartmentNumber: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  district: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  country: string;
}
