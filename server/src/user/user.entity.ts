import { IsEmail } from 'class-validator';
import { Cart } from 'src/cart/cart.entity';
import { DeliveryAddress } from 'src/order/entities/delivery-address.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/product.entity';
import { Review } from 'src/review/review.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum UserType {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => DeliveryAddress, (deliveryAddress) => deliveryAddress.user)
  deliveryAddresses: DeliveryAddress[];
  @Column({ type: 'enum', enum: UserType })
  userType: UserType;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
