import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
  ],
  exports: [UserService],
})
export class UserModule {}
