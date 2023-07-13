import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getProductsApi } from "../api/productApi";
import { useGetProducts } from "../hooks/useGetProducts";
import { ProductResponse } from "../ServerResponseType";
import { ProductType } from "../ServerResponseType";

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const products = (await useGetProducts()) as ProductResponse;
      if (products.statusCode === 404) {
        return;
      }
      setProducts(products);
    };
    fetchProduct();
  }, [products]);
  return (
    <>
      {products &&
        products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            rating={product.rating}
            description={product.description}
            image={product.image}
          />
        ))}
    </>
  );
};

export default Products;
