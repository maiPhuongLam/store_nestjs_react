import { ReactNode, createContext, useReducer } from "react";
import {
  CartAction,
  CartActionType,
  CartState,
  cartReducer,
} from "../reducers/cartReducer";

interface CartContextProviderProps {
  children: ReactNode;
}

export const initialCartState: CartState = {
  id: undefined,
  userId: undefined,
  cartItems: [],
};

interface CartContextDataDefault {
  cartState: CartState;
  cartDispatch: React.Dispatch<CartAction>;
}

const cartContextDataDefault: CartContextDataDefault = {
  cartState: initialCartState,
  cartDispatch: () => {},
};

export const CartConext = createContext<CartContextDataDefault>(
  cartContextDataDefault
);

const CartContextProvider: React.FunctionComponent<
  CartContextProviderProps
> = ({ children }) => {
  const [cartState, cartDispatch] = useReducer<
    (state: CartState, action: CartAction) => CartState
  >(cartReducer, initialCartState as CartState);

  return (
    <CartConext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartConext.Provider>
  );
};

export default CartContextProvider;
