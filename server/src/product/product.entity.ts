import { IsEmail } from 'class-validator';
import { CartItem } from 'src/cart/cart-item.entity';
import { Cart } from 'src/cart/cart.entity';
import { Category } from 'src/category/category.entity';
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
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column()
  price: number;

  @Column({ type: 'float' })
  rating: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column()
  userId: number;

  @Column()
  categoryId: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
