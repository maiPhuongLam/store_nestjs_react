import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { Product } from './product/product.entity';
import { Cart } from './cart/cart.entity';
import { Order } from './order/entities/order.entity';
import { Payment } from './order/entities/payment.entity';
import { Review } from './review/review.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CartItem } from './cart/cart-item.entity';
import { DeliveryAddress } from './order/entities/delivery-address.entity';
import { UserInterceptor } from './user/user.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mpl08092002',
      database: 'store_nestjs_react',
      entities: [
        User,
        Product,
        Cart,
        Order,
        Payment,
        Review,
        Category,
        CartItem,
        DeliveryAddress,
      ],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    OrderModule,
    CartModule,
    PaymentModule,
    ReviewModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
})
export class AppModule {}
