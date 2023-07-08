import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser, UserInfo } from 'src/user/user.decorator';
import { CreateProductDto } from './dtos/create-product.dto';
import { CartService } from 'src/cart/cart.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async getProducts(
    @Query('name') name: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
    @Query('category') category: string,
  ) {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { moreThan: parseFloat(minPrice) }),
            ...(maxPrice && { lessThan: parseFloat(maxPrice) }),
          }
        : undefined;
    if (category) {
      this;
    }
    const filter = {
      ...(name && { name }),
      ...(price && { price }),
      ...(category && { categoryName: category }),
    };
    return this.productService.getProducts(filter);
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProduct(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createProduct(
    @Body() body: CreateProductDto,
    @GetUser() user: UserInfo,
  ) {
    return this.productService.createProduct(body, user.id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateProductDto,
    @GetUser() user: UserInfo,
  ) {
    return this.productService.updateProduct(id, body, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserInfo,
  ) {
    return this.productService.deleteProduct(id, user.id);
  }
}
