import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DeliveryAddress } from './entities/delivery-address.entity';
import { Payment } from './entities/payment.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Order, DeliveryAddress, Payment])],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class OrderModule {}
