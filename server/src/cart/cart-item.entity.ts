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
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @Column()
  cartId: number;

  @Column()
  productId: number;
}
