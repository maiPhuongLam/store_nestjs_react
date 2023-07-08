import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await this.authService.register(body);
    return user;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const token = await this.authService.login(email, password);
    return token;
  }
}
