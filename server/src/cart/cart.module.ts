import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem])],
  controllers: [CartController],
  providers: [
    CartService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class CartModule {}
