import {
  CartItemType,
  CartResponse,
  ErrorResponse,
} from "../ServerResponseType";
import { cartApi } from "../api/cartApi";
import {
  CartActionType,
  CartState,
} from "../global-state/reducers/cartReducer";
import { useCartContext } from "./useCartContext";

export const useCart = () => {
  const { cartDispatch } = useCartContext();
  const getCart = async (cartId: string, token: string) => {
    const response = await fetch(`${cartApi}/${cartId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const cart = (await response.json()) as CartResponse;
    cartDispatch({ type: CartActionType.SET_CART, payload: cart });
    return cart;
  };

  const createCart = async (token: string) => {
    const response = await fetch(cartApi, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const cart = (await response.json()) as {
      id: number;
      userId: number;
      cartItems: CartItemType[];
    };
    return cart;
  };

  const addItemToCart = async (
    cartId: number,
    productId: number,
    token: string
  ) => {
    const response = await fetch(`${cartApi}/${cartId}/items`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });
    const result = (await response.json()) as CartResponse;
    return result;
  };

  const decreaseItem = async (
    cartId: number,
    itemId: number,
    token: string
  ) => {
    const response = await fetch(
      `${cartApi}/${cartId}/items/${itemId}/decrease`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = (await response.json()) as CartResponse;
    return result;
  };

  const removeItem = async (cartId: number, itemId: number, token: string) => {
    const response = await fetch(`${cartApi}/${cartId}/items/${itemId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = (await response.json()) as CartResponse;
    return result;
  };

  return { getCart, createCart, addItemToCart, decreaseItem, removeItem };
};
