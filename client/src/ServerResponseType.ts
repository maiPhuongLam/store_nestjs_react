export type ErrorResponse = {
  message?: string[];
  error?: string;
  statusCode?: number;
};

export type LoginResponse = {
  accessToken: string;
} & ErrorResponse;

export type RegisterResponse = {
  id: number;
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  userType: string;
} & ErrorResponse;
