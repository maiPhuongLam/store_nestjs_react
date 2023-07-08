import { IsEmail } from 'class-validator';
import { Cart } from 'src/cart/cart.entity';
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
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
