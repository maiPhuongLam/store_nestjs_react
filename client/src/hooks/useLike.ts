import { LikeResponse } from "../ServerResponseType";
import { likeApi } from "../api/likeApi";

export const useLike = () => {
  const getLike = async (productId: number, token: string) => {
    const response = await fetch(`${likeApi}/${productId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const like = (await response.json()) as LikeResponse;
    return like;
  };

  const like = async (productId: number, token: string) => {
    const response = await fetch(`${likeApi}/${productId}/like`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  const unlike = async (productId: number, token: string) => {
    const response = await fetch(`${likeApi}/${productId}/unlike`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };
  return { getLike, like, unlike };
};
