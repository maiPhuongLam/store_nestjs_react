import { useContext } from "react";
import { CartConext } from "../global-state/Contexts/CartContext";

export const useCartContext = () => {
  const context = useContext(CartConext);
  if (!context) {
    throw Error("error");
  }
  return context;
};
