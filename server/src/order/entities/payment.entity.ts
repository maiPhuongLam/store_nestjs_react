import { IsEmail } from 'class-validator';
import { Cart } from 'src/cart/cart.entity';
import { Order } from 'src/order/entities/order.entity';
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

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ type: 'float' })
  amount: number;

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn()
  order: Order;

  @Column()
  orderId: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
