import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'maiphuonglam',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AuthModule {}
