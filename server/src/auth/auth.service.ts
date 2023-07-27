import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dtos/register.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Email is incorrect');
    }
    const isEqual = await bcrypt.compare(pass, user.password);
    if (!isEqual) {
      throw new BadRequestException('Password is incorrect');
    }
    const token = await jwt.sign(
      { id: user.id, userType: user.userType },
      'maiphuonglam',
      {
        expiresIn: '10h',
      },
    );
    return {
      userId: user.id,
      accessToken: token,
    };
  }

  async register(data: RegisterDto) {
    const { email, password, firstName, lastName, phone, address } = data;
    const userExist = await this.userService.findByEmail(data.email);
    if (userExist) {
      throw new ConflictException('Email is exist');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const user = await this.userService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      phone,
    });
    return new AuthResponseDto(user);
  }
}
