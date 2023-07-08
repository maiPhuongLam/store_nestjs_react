import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryResponseDto } from './dtos/category-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.find();
    if (categories.length === 0) {
      throw new NotFoundException();
    }

    return categories.map((category) => new CategoryResponseDto(category));
  }

  async create(name: string): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.save({ name });
    return new CategoryResponseDto(category);
  }

  async update(id: number, name: string): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException();
    }
    category.name = name;
    await this.categoryRepository.save(category);
    return new CategoryResponseDto(category);
  }

  async delete(id: number): Promise<string> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException();
    }
    await this.categoryRepository.delete(category);
    return 'Delete category success';
  }
}
