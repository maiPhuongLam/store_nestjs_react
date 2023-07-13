import { getProductsApi } from "../api/productApi";

export const useGetProducts = async () => {
  const response = await fetch(getProductsApi, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
