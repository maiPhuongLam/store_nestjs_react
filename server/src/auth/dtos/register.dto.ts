import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Họ không được để trống' })
  @IsString()
  @MaxLength(20, { message: 'Họ của bạn quá dài (tối đa 20 ký tự)' })
  firstName: string;

  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString()
  @MaxLength(20, { message: 'Tên của bạn quá dài (tối đa 20 ký tự)' })
  lastName: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 kí tự' })
  password: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @Matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
    message: 'Số điện thoại không hợp lệ',
  })
  phone: string;

  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @IsString()
  address: string;
}
