import { ProductType } from "../../ServerResponseType";
import { initialProductState } from "../Contexts/ProductContext";
import { User, initialState } from "../Contexts/UserContext";

export interface ProductState {
  products: ProductType[] | [];
}

export enum ProductActionType {
  ADD_PRODUCT = "add_product",
  DELETE_PRODUCT = "delete_product",
  UPDATE_PRODUCT = "update_product",
  SET_PRODUCT = "set_product",
}

export interface ProductAction {
  type: ProductActionType;
  payload: any;
}

export const productReducer = (
  state: ProductState,
  action: ProductAction
): typeof initialProductState => {
  switch (action.type) {
    case "add_product":
      return {
        products: [...state.products, action.payload],
      };
    default:
      throw new Error();
  }
};
