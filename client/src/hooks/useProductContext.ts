import { useContext } from "react";

import { ProductConext } from "../global-state/Contexts/ProductContext";

export const useProductContext = () => {
  const context = useContext(ProductConext);
  if (!context) {
    throw Error("error");
  }
  return context;
};
