import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Between, Repository } from 'typeorm';
import { ProductResponseDto } from './dtos/product-response.dto';
import { Category } from 'src/category/category.entity';

interface GetProductParams {
  name?: string;
  price?: {
    lessThan?: number;
    moreThan?: number;
  };
  categoryName: string;
}

interface CreatProductParams {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface UpdateProductParams {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(filter: GetProductParams): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find({
      where: {
        name: filter.name,
        price: Between(
          filter.price?.moreThan || 0,
          filter.price?.lessThan || 99999999999,
        ),
        category: {
          name: filter.categoryName,
        },
      },
    });

    if (products.length === 0) {
      throw new NotFoundException();
    }

    return products.map((product) => {
      delete product.updatedDate;
      delete product.createdDate;
      return new ProductResponseDto(product);
    });
  }

  async getProduct(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException();
    }
    delete product.updatedDate;
    delete product.createdDate;
    return new ProductResponseDto(product);
  }

  async createProduct(data: CreatProductParams): Promise<ProductResponseDto> {
    const product = await this.productRepository.save({ ...data });
    delete product.updatedDate;
    delete product.createdDate;
    return new ProductResponseDto(product);
  }

  async updateProduct(
    id: number,
    data: UpdateProductParams,
  ): Promise<ProductResponseDto> {
    const product = await this.getProduct(id);
    await this.productRepository.update(product.id, data);
    await this.productRepository.save(product);
    return this.getProduct(id);
  }

  async deleteProduct(id: number) {
    const product = await this.getProduct(id);
    await this.productRepository.delete(product.id);
    return 'Delete success';
  }
}
