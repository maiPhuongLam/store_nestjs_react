import { User } from "./global-state/Contexts/UserContext";

export type ErrorResponse = {
  message?: string[];
  error?: string;
  statusCode?: number;
};

export type LoginResponse = User & ErrorResponse;

export type RegisterResponse = {
  id: number;
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  userType: string;
} & ErrorResponse;

export type ProductType = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  quantity: number;
  category: string;
  reviews: any[];
  likes: any[];
};

export type ProductsResponse = ProductType[] & ErrorResponse;
export type ProductResponse = ProductType & ErrorResponse;

export type CartItemType = {
  id: number;
  quantity: number;
  cartId: number;
  productId: number;
  product: ProductType;
};

export type CartResponse = {
  id: number;
  userId: number;
  cartItems: CartItemType[];
} & ErrorResponse;

export type LikeResponse = {
  isLike: boolean;
} & ErrorResponse;
