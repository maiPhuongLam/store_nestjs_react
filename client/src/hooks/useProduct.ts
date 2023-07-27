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

  return { getProducts };
};
