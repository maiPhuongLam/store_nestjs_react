import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser, UserInfo } from 'src/user/user.decorator';
import { UserType } from 'src/user/user.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @UseGuards(AuthGuard)
  @Get()
  async getCategories(@GetUser() user: UserInfo) {
    console.log(user);
    if (user?.userType !== UserType.ADMIN) {
      throw new UnauthorizedException();
    }
    return this.categoryService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async addCategory(@Body('name') name: string, @GetUser() user: UserInfo) {
    if (user?.userType !== UserType.ADMIN) {
      throw new UnauthorizedException();
    }
    return this.categoryService.create(name);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
    @GetUser() user: UserInfo,
  ) {
    console.log(user);
    if (user.userType !== UserType.ADMIN) {
      throw new UnauthorizedException();
    }
    return this.categoryService.update(id, name);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserInfo,
  ) {
    if (user.userType !== UserType.ADMIN) {
      throw new UnauthorizedException();
    }
    return this.categoryService.delete(id);
  }
}
