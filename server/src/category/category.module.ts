import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
