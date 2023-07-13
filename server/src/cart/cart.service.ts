import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { CartResponseDto } from './dtos/cart-response.dto';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';
import { CartItem } from './cart-item.entity';
import { Product } from 'src/product/product.entity';
interface AddItemToCartParams {
  productId: number;
}

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async createCart(userId: number): Promise<CartResponseDto> {
    const cart = await this.cartRepository.save({ userId });
    return new CartResponseDto(cart);
  }

  async getCart(id: number, userId: number): Promise<CartResponseDto> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException();
    }
    if (userId !== cart.userId) {
      throw new UnauthorizedException();
    }
    return new CartResponseDto(cart);
  }

  async addItemToCart(
    cartId: number,
    createCartItemDto: AddItemToCartParams,
  ): Promise<CartResponseDto> {
    const { productId } = createCartItemDto;
    const cart = await this.cartRepository.findOne({
      where: {
        id: cartId,
      },
      relations: ['cartItems'],
    });
    const cartItem = await this.cartItemRepository.create({
      productId,
      cartId: cart.id,
    });
    await this.cartItemRepository.save(cartItem);
    await cart.cartItems.push(cartItem);
    const fetchCart = await this.cartRepository.save(cart);
    return new CartResponseDto(fetchCart);
  }

  async increaseItemQuantity(
    cartId: number,
    itemId: number,
  ): Promise<CartResponseDto> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['cartItems'],
    });
    if (!cart) {
      throw new NotFoundException();
    }
    const item = cart.cartItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity += 1;
      await this.cartItemRepository.update(item.id, {
        quantity: item.quantity,
      });
      await this.cartRepository.save(cart);
      return new CartResponseDto(cart);
    } else {
      throw new NotFoundException();
    }
  }

  async decreaseItemQuantity(
    cartId: number,
    itemId: number,
  ): Promise<CartResponseDto> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['cartItems'],
    });
    if (!cart) {
      throw new NotFoundException();
    }
    const item = cart.cartItems.find((item) => item.id === itemId);
    if (item) {
      if (item.quantity >= 1) {
        item.quantity -= 1;
        await this.cartItemRepository.update(item.id, {
          quantity: item.quantity,
        });
      }
      if (item.quantity <= 0) {
        cart.cartItems = cart.cartItems.filter((item) => item.id !== itemId);
        await this.cartItemRepository.delete(item.id);
      }
      await this.cartRepository.save(cart);
      return new CartResponseDto(cart);
    } else {
      throw new NotFoundException();
    }
  }

  async removeItemFromCart(
    cartId: number,
    itemId: number,
  ): Promise<CartResponseDto> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['cartItems'],
    });
    if (!cart) {
      throw new NotFoundException();
    }
    const item = cart.cartItems.find((item) => item.id === itemId);
    if (!item) {
      throw new NotFoundException();
    }
    cart.cartItems = cart.cartItems.filter((item) => item.id !== itemId);
    await this.cartItemRepository.delete(item.id);
    await this.cartRepository.save(cart);
    return new CartResponseDto(cart);
  }

  async clearCart(cartId: number): Promise<string> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
    });
    if (!cart) {
      throw new NotFoundException();
    }
    await this.cartRepository.delete(cartId);
    return 'clear cart success';
  }
}
