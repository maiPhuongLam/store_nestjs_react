import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { GetUser, UserInfo } from 'src/user/user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get(':productId')
  async getLikeByUser(
    @Param('productId', ParseIntPipe) productId: number,
    @GetUser() user: UserInfo,
  ) {
    return this.likeService.getLikeByUserId(user.id, productId);
  }

  @Post(':productId/like')
  async likeProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @GetUser() user: UserInfo,
  ) {
    this.likeService.like(user.id, productId);
  }

  @Delete(':productId/unlike')
  async unlikeProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @GetUser() user: UserInfo,
  ) {
    this.likeService.unlike(user.id, productId);
  }
}
