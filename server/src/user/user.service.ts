import { Injectable } from '@nestjs/common';
import { User, UserType } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dtos/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(data: RegisterDto) {
    const user = await this.usersRepository.create(data);
    user.userType = UserType.CUSTOMER;
    await this.usersRepository.save(user);
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
