import React, { useEffect, useState } from "react";
import "./cart.css";
import { useCart } from "../../hooks/useCart";
import { useCartContext } from "../../hooks/useCartContext";
import { useUserContext } from "../../hooks/useUserContext";
import { CartState } from "../../global-state/reducers/cartReducer";
import CartItem from "../../components/CartItem";
const Cart: React.FC = () => {
  const { getCart } = useCart();
  const cartId = localStorage.getItem("cart");
  const { cartState, cartDispatch } = useCartContext();
  const { userState } = useUserContext();
  const [cart, setCart] = useState<CartState>(cartState);
  useEffect(() => {
    const controller = new AbortController();
    if (userState?.accessToken) {
      console.log("setCart");
      const fetchCart = async () => {
        const cartRes = await getCart(
          cartId as string,
          userState?.accessToken as string
        );
        if (cartRes.error) {
          alert("fail");
          return;
        }
        setCart(cartRes);
        return cartRes;
      };
      fetchCart();
    }
    return () => {
      controller.abort();
    };
  }, [userState]);
  console.log(cart.cartItems);
  return (
    <>
      <div className=" bg-gray-100 pt-20">
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
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">$129.99</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
