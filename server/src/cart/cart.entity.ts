import { IsEmail } from 'class-validator';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];

  @Column()
  userId: number;

  @OneToMany(() => Order, (order) => order.cart)
  orders: Cart[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
