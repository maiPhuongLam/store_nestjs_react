import { ReactNode, createContext, useReducer } from "react";
import {
  ProductAction,
  ProductState,
  productReducer,
} from "../reducers/productReducer";

interface ProductContextProviderProps {
  children: ReactNode;
}

export const initialProductState: ProductState = {
  products: [],
};

interface ProductContextDataDefault {
  productState: ProductState;
  productDispatch: React.Dispatch<ProductAction>;
}

const productContextDataDefault: ProductContextDataDefault = {
  productState: { products: [] },
  productDispatch: () => {},
};

export const ProductConext = createContext<ProductContextDataDefault>(
  productContextDataDefault
);

const ProductContextProvider: React.FunctionComponent<
  ProductContextProviderProps
> = ({ children }) => {
  const [productState, productDispatch] = useReducer<
    (state: ProductState, action: ProductAction) => ProductState
  >(productReducer, initialProductState as ProductState);
  return (
    <ProductConext.Provider value={{ productState, productDispatch }}>
      {children}
    </ProductConext.Provider>
  );
};
