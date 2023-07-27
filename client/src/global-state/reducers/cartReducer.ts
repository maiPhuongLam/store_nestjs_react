import { CartItemType, ProductType } from "../../ServerResponseType";
import { initialCartState } from "../Contexts/CartContext";

export type CartState = {
  id: number | undefined;
  userId: number | undefined;
  cartItems: CartItemType[];
};

export enum CartActionType {
  ADD_CART_ITEM = "add_cart_item",
  DELETE_CART_ITEM = "delete_cart_item",
  SET_CART = "set_cart",
}

export interface CartAction {
  type: CartActionType;
  payload: any;
}

export const cartReducer = (
  state: CartState,
  action: CartAction
): typeof initialCartState => {
  switch (action.type) {
    case "add_cart_item":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "delete_cart_item":
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload.id),
        ],
      };
    case "set_cart":
      return action.payload;
    default:
      throw new Error();
  }
};
