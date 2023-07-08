import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { GetUser, UserInfo } from 'src/user/user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':cartId')
  async getCart(
    @Param('cartId', ParseIntPipe) id: number,
    @GetUser() user: UserInfo,
  ) {
    return this.cartService.getCart(id, user.id);
  }

  @Post()
  async createCart(@GetUser() user: UserInfo) {
    return this.cartService.createCart(user.id);
  }

  @Post(':cartId/items')
  async addItemToCart(
    @Param('cartId', ParseIntPipe) id: number,
    @Body() body: CreateCartItemDto,
  ) {
    console.log(id);
    return this.cartService.addItemToCart(id, body);
  }

  @Put(':cartId/items/:itemId/increase')
  async increaseItemFromCart(
    @Param('cartId', ParseIntPipe) id: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.cartService.increaseItemQuantity(id, itemId);
  }

  @Put(':cartId/items/:itemId/decrease')
  async decreaseItemFromCart(
    @Param('cartId', ParseIntPipe) id: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.cartService.decreaseItemQuantity(id, itemId);
  }

  @Delete(':cartId/items/:itemId')
  async removeItemFromCart(
    @Param('cartId', ParseIntPipe) id: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.cartService.removeItemFromCart(id, itemId);
  }

  @Delete(':cartId')
  async clearCart(@Param('cartId', ParseIntPipe) id: number) {
    return this.cartService.clearCart(id);
  }
}
