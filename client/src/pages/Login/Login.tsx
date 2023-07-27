import React, { useEffect, useRef, useState } from "react";
import "./login.css";
import { useLogin } from "../../hooks/useLogin";
import { ErrorResponse, LoginResponse } from "../../ServerResponseType";
import { useUserContext } from "../../hooks/useUserContext";
import { UserActionType } from "../../global-state/reducers/userRecucer";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const naviage = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { userState, userDispatch } = useUserContext();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email không được để trống");
      return;
    }
    if (!password) {
      setError("password không được để trống");
      return;
    }
    const data = (await useLogin({
      email,
      password,
    })) as LoginResponse;
    if (data.statusCode === 404) {
      setError("Email không chính xác");
      return;
    }
    if (data.statusCode === 400) {
      setError("Mật khẩu không chính xác");
      return;
    }
    userDispatch({
      type: UserActionType.USER_LOGIN,
      payload: data,
    });
    localStorage.setItem("user", JSON.stringify(data));
    naviage("/");
  };

  return (
    <div className="login-page flex w-full items-center justify-center bg-white">
      <form onSubmit={handleSubmit}>
        <h1>ĐĂNG NHẬP</h1>
        <div
          className={
            error.toLowerCase().includes("email")
              ? "form-field dangerous"
              : "form-field"
          }
        >
          <input
            placeholder="Địa chỉ email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          className={
            error.toLowerCase().includes("mật khẩu")
              ? "form-field dangerous"
              : "form-field"
          }
        >
          <input
            placeholder="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-field">
          <button type="submit">Đăng nhập</button>
        </div>
        <div className="register-link">
          <p>
            Bạn chưa có tài khoản?
            <a href="/register"> Đăng kí miễn phí</a>
          </p>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
