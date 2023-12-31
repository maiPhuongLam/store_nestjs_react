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
import { LikeModule } from './like/like.module';
import { Like } from './like/like.entity';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
        Like,
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
    LikeModule,
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
