import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, PaymentMethod } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderResponseDto } from './dtos/order-response.dto';
import { DeliveryAddress } from './entities/delivery-address.entity';

interface CreateDeliveryAddressParams {
  apartmentNumber: string;
  street: string;
  district: string;
  city: string;
  country: string;
  userId: number;
}

interface CreateOrderParams {
  totalAmount: number;
  deliveryAddressId: number;
  paymentMethod: PaymentMethod;
}

interface UpdateOrderParam {
  to;
}
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(DeliveryAddress)
    private readonly deliveryAddressRepository: Repository<DeliveryAddress>,
  ) {}

  async createDeliveryAddress(
    data: CreateDeliveryAddressParams,
  ): Promise<DeliveryAddress> {
    return this.deliveryAddressRepository.save(data);
  }

  async createOrder(
    data: CreateOrderParams,
    cartId: number,
    userId: number,
  ): Promise<OrderResponseDto> {
    const { totalAmount, deliveryAddressId, paymentMethod } = data;
    const order = await this.orderRepository.save({
      totalAmount,
      deliveryAddressId,
      paymentMethod,
      cartId,
      date: new Date(Date.now()),
      userId,
    });
    return new OrderResponseDto(order);
  }

  async getOrder(orderId: number): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException();
    }
    return new OrderResponseDto(order);
  }

  async getOrdersByUserId(userId: number): Promise<OrderResponseDto[]> {
    const orders = await this.orderRepository.find({ where: { userId } });
    if (orders.length === 0) {
      throw new NotFoundException();
    }
    return orders.map((order) => {
      return new OrderResponseDto(order);
    });
  }

  // async updateOrder(
  //   orderId: number,
  //   updateOrderDto: Partial<CreateOrderDto>,
  // ): Promise<Order> {
  //   const order = await this.orderRepository.findOne(orderId);
  //   Object.assign(order, updateOrderDto);
  //   return this.orderRepository.save(order);
  // }

  // async deleteOrder(orderId: number): Promise<void> {
  //   await this.orderRepository.delete(orderId);
  // }
}
