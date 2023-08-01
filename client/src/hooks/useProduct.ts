import { ProductResponse } from "../ServerResponseType";
import { productsApi } from "../api/productApi";

export const useProduct = () => {
  const getProducts = async (filter: string) => {
    const response = await fetch(`${productsApi}/${filter}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  const getProduct = async (id: number, token: string) => {
    const response = await fetch(`${productsApi}/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const product = (await response.json()) as ProductResponse;
    // if (product.statusCode === 404) {
    //   return "error";
    // }
    return product;
  };

  return { getProducts, getProduct };
};
