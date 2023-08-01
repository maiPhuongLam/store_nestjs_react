import { IsEmail } from 'class-validator';
import { CartItem } from 'src/cart/cart-item.entity';
import { Cart } from 'src/cart/cart.entity';
import { Category } from 'src/category/category.entity';
import { Product } from 'src/product/product.entity';
import { Review } from 'src/review/review.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Like {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Product, (product) => product.likes, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
