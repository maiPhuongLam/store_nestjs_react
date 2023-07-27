import React, { useEffect, useRef, useState } from "react";
import Product from "./Product";
import { ProductsResponse } from "../ServerResponseType";
import { useProductContext } from "../hooks/useProductContext";
import { ProductActionType } from "../global-state/reducers/productReducer";
import { useProduct } from "../hooks/useProduct";

type ProductsProps = {
  categoryFilter: string;
  priceFilter: string;
  nameFilter: string;
  currentPage: number;
  sort: string;
  setProductsCount: React.Dispatch<React.SetStateAction<number>>;
};

const Products: React.FC<ProductsProps> = ({
  categoryFilter,
  priceFilter,
  nameFilter,
  currentPage,
  sort,
  setProductsCount,
}: ProductsProps) => {
  const query = useRef<string>("");
  const { productState, productDispatch } = useProductContext();
  const { getProducts } = useProduct();
  useEffect(() => {
    const controller = new AbortController();
    const fetchProduct = async () => {
      query.current = `?page=${currentPage}`;
      if (categoryFilter) {
        query.current += `&${categoryFilter}`;
      }
      if (priceFilter) {
        query.current += `&${priceFilter}`;
      }
      if (nameFilter) {
        query.current += `&${nameFilter}`;
      }
      if (sort) {
        query.current += `&${sort}`;
      }
      const products = (await (query
        ? getProducts(query.current)
        : getProducts(""))) as ProductsResponse;
      if (products.statusCode === 404) {
        setProductsCount(1);
        productDispatch({
          type: ProductActionType.SET_PRODUCT,
          payload: [],
        });
        return;
      }
      setProductsCount(products.length);
      productDispatch({
        type: ProductActionType.SET_PRODUCT,
        payload: products,
      });
    };
    fetchProduct();
    return () => controller.abort();
  }, [
    sort,
    currentPage,
    nameFilter,
    categoryFilter,
    priceFilter,
    productDispatch,
  ]);
  return (
    <>
      {productState.products.length > 0 ? (
        productState.products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            rating={product.rating}
            description={product.description}
            image={product.image}
            category={product.category}
            reviews={product.reviews}
          />
        ))
      ) : (
        <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
          <div className="flex flex-col">Không tìm thấy sản phẩm</div>
        </div>
      )}
    </>
  );
};

export default Products;
