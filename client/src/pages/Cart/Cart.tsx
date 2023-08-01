import React, { useEffect, useState } from "react";
import "./cart.css";
import { useCart } from "../../hooks/useCart";
import { useCartContext } from "../../hooks/useCartContext";
import { useUserContext } from "../../hooks/useUserContext";
import {
  CartActionType,
  CartState,
} from "../../global-state/reducers/cartReducer";
import CartItem from "../../components/CartItem";
import Cost from "../../components/Cost";
import { CartItemType } from "../../ServerResponseType";
const Cart: React.FC = () => {
  const { cartState, cartDispatch } = useCartContext();
  const [cart, setCart] = useState<CartState>(cartState);
  const [subTotal, setSubTotal] = useState<number>(0);
  useEffect(() => {
    if (cartState.id) {
      setCart(cartState);
    }
  }, [cartState]);

  useEffect(() => {
    if (cartState.id) {
      const subTotalArr = cartState.cartItems.map(
        (item) => item.quantity * item.product.price
      );
      setSubTotal(
        subTotalArr.reduce<number>((result, current) => result + current, 0)
      );
    }
  }, [cartState]);
  return (
    <>
      <div className=" bg-white pt-24 pb-28">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-7xl justify-center md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cart.cartItems ? (
              cart.cartItems.map((item, index) => (
                <CartItem key={index} item={item} cartDispatch={cartDispatch} />
              ))
            ) : (
              <p>khong co</p>
            )}
          </div>
          <Cost subTotal={subTotal} />
        </div>
      </div>
    </>
  );
};

export default Cart;
