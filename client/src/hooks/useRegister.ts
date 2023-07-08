import { registerApi } from "../api/authApi";
interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}
export const useRegister = async (data: RegisterData) => {
  const response = await fetch(registerApi, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
