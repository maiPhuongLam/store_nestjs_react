import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateDeliveryAddressDto } from './dtos/create-delivey-address.dto';
import { GetUser, UserInfo } from 'src/user/user.decorator';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('delivery-address')
  async createDeliveryAddress(
    @Body() body: CreateDeliveryAddressDto,
    @GetUser() user: UserInfo,
  ) {
    console.log(user);
    return this.orderService.createDeliveryAddress({
      ...body,
      userId: user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Post(':cartId')
  async createOrder(
    @Body() body: CreateOrderDto,
    @Param('cartId', ParseIntPipe) cartId: number,
    @GetUser() user: UserInfo,
  ) {
    return this.orderService.createOrder(body, cartId, user.id);
  }
}
