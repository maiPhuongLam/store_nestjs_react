import { IsEmail } from 'class-validator';
import { Cart } from 'src/cart/cart.entity';
import { Payment } from 'src/order/entities/payment.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { DeliveryAddress } from './delivery-address.entity';

export enum PaymentMethod {
  PAYPAL = 'paypal',
  STRIPE = 'stripe',
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalAmount: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Cart, (cart) => cart.orders)
  cart: Cart;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  @Column()
  userId: number;

  @Column()
  cartId: number;

  @Column()
  date: Date;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => DeliveryAddress, (deliveryAddress) => deliveryAddress.orders)
  deliveryAddress: DeliveryAddress;

  @Column()
  deliveryAddressId: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
