import { IsEmail } from 'class-validator';
import { Cart } from 'src/cart/cart.entity';
import { Product } from 'src/product/product.entity';
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
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ type: 'longtext' })
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Review;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
