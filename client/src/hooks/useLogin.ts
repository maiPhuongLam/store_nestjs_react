import { loginApi } from "../api/authApi";
interface LoginData {
  email: string;
  password: string;
}
export const useLogin = async (data: LoginData) => {
  const response = await fetch(loginApi, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
