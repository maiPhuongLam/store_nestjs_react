import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LikeResponse, ProductResponse } from "../../ServerResponseType";
import { productsApi } from "../../api/productApi";
import { useCartContext } from "../../hooks/useCartContext";
import { CartActionType } from "../../global-state/reducers/cartReducer";
import { useUserContext } from "../../hooks/useUserContext";
import { useCart } from "../../hooks/useCart";
import { likeApi } from "../../api/likeApi";
import Review from "../../components/Review";
import { useProduct } from "../../hooks/useProduct";
import { useLike } from "../../hooks/useLike";
import ProductInfo from "../../components/ProductInfo";

const ProductDetail: React.FC = () => {
  const { getProduct } = useProduct();
  const { getLike, like, unlike } = useLike();
  const { createCart, addItemToCart } = useCart();
  const { userState } = useUserContext();
  const { cartState, cartDispatch } = useCartContext();
  const { id } = useParams<string>();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductResponse | undefined>(
    undefined
  );
  useEffect(() => {
    const controller = new AbortController();
    if (userState?.accessToken) {
      const fetchProduct = async () => {
        const product = await getProduct(+id!, userState?.accessToken);
        setProduct(product);
      };
      fetchProduct();
    }
    return () => controller.abort();
  }, [id, isLike, userState]);

  useEffect(() => {
    if (userState?.accessToken && product?.id) {
      const fetchLike = async () => {
        const like = await getLike(product.id, userState?.accessToken);
        setIsLike(like.isLike);
        return;
      };
      fetchLike();
    }
  }, [userState, isLike, product]);

  const handleLike = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (userState?.accessToken) {
      if (!isLike) {
        const result = await like(+id!, userState?.accessToken);
        if (result.ok) setIsLike(!isLike);
      } else {
        const result = await unlike(+id!, userState?.accessToken);
        if (result.ok) setIsLike(!isLike);
      }
    }
  };

  const handleAddToCart = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!cartState.id) {
      const token = userState?.accessToken as string;
      const cart = await createCart(token);
      cartDispatch({
        type: CartActionType.SET_CART,
        payload: {
          id: cart.id,
          userId: cart.userId,
          cartItems: [],
        },
      });
      localStorage.setItem("cart", JSON.stringify(cart.id));
      const result = await addItemToCart(
        cart.id,
        product?.id!,
        userState?.accessToken!
      );
      if (result.statusCode) {
        alert("Add to cart fail");
        return;
      }
      alert("Add to cart success");
      return;
    }
    const cart = await addItemToCart(
      cartState.id,
      product?.id!,
      userState?.accessToken!
    );
    if (cart.statusCode) {
      alert("Add to cart fail");
      return;
    }
    alert("Add to cart success");
  };
  return (
    <>
      {product && (
        <>
          <ProductInfo
            product={product}
            handleLike={handleLike}
            handleAddToCart={handleAddToCart}
            isLike={isLike}
          />
          <Review />
        </>
      )}
    </>
  );
};

export default ProductDetail;
