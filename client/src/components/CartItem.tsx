import React, { useState } from "react";
import { CartItemType } from "../ServerResponseType";
import { useCart } from "../hooks/useCart";
import { useUserContext } from "../hooks/useUserContext";
import { useCartContext } from "../hooks/useCartContext";
import {
  CartAction,
  CartActionType,
} from "../global-state/reducers/cartReducer";

interface CartItemProps {
  item: CartItemType;
  cartDispatch: React.Dispatch<CartAction>;
}

const CartItem: React.FC<CartItemProps> = ({ item, cartDispatch }) => {
  const [itemQuantity, setItemQuantity] = useState<number>(item.quantity);
  const { userState } = useUserContext();
  const { addItemToCart, decreaseItem, removeItem } = useCart();
  const handleIncreaseItem = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const result = await addItemToCart(
      item.cartId,
      item.productId,
      userState?.accessToken!
    );

    if (result.statusCode) {
      alert("Add to cart fail");
      return;
    }

    cartDispatch({ type: CartActionType.UPDATE_CART, payload: result });
    setItemQuantity((prev) => prev + 1);
    return;
  };

  const handleDecreaseItem = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const result = await decreaseItem(
      item.cartId,
      item.id,
      userState?.accessToken!
    );
    if (result.statusCode) {
      alert("remove to cart fail");
      return;
    }
    cartDispatch({ type: CartActionType.UPDATE_CART, payload: result });
    setItemQuantity((prev) => prev - 1);
    return;
  };

  const handleRemoveItem = async () => {
    const result = await removeItem(
      item.cartId,
      item.id,
      userState?.accessToken!
    );
    if (result.statusCode) {
      alert("fail");
    }
    cartDispatch({ type: CartActionType.UPDATE_CART, payload: result });
    return;
  };
  return (
    <>
      {item.product && (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <div className="w-36 h-36">
            <img
              src={item.product.image}
              alt="product-image"
              className="hover:grow hover:shadow-lg h-full w-full object-cover"
            />
          </div>
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">
                {item.product.name}
              </h2>
              <p className="mt-1 text-xs text-gray-700">
                {item.product.rating}
              </p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <button
                  onClick={handleDecreaseItem}
                  className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                >
                  {" "}
                  -{" "}
                </button>
                <span className="px-3">{itemQuantity}</span>
                <button
                  onClick={handleIncreaseItem}
                  className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.product.price)}{" "}
                </p>
              </div>
            </div>
          </div>
          <svg
            onClick={handleRemoveItem}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default CartItem;
