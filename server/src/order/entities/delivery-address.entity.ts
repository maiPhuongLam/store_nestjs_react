import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from './order.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class DeliveryAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apartmentNumber: string;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @ManyToOne(() => User, (user) => user.deliveryAddresses)
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Order, (order) => order.deliveryAddress)
  orders: Order[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
