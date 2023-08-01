import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
    private readonly productService: ProductService,
  ) {}

  async getLikeByUserId(userId: number, productId) {
    const like = await this.likeRepository.findOne({
      where: { userId, productId },
      relations: { user: true },
    });
    if (!like) {
      return { isLike: false };
    }
    return { isLike: true };
  }

  async like(userId: number, productId: number) {
    const likeExisted = await this.likeRepository.findOne({
      where: { userId, productId },
    });
    if (likeExisted) {
      throw new ForbiddenException();
    }
    const like = await this.likeRepository.create({ userId, productId });
    await this.likeRepository.save(like);
    return { isLike: true };
  }

  async unlike(userId: number, productId: number) {
    const like = await this.likeRepository.findOne({
      where: { userId, productId },
    });
    if (!like) {
      throw new NotFoundException();
    }
    await this.likeRepository.delete({ userId, productId });
    return { isLike: false };
  }
}
