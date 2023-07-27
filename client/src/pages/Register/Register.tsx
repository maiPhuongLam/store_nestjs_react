import React, { useState } from "react";
import "./register.css";
import "../Login/login.css";
import { useRegister } from "../../hooks/useRegister";
import { RegisterResponse } from "../../ServerResponseType";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName) {
      setError("Họ không được để trống");
      return;
    }
    if (!lastName) {
      setError("Tên không được để trống");
      return;
    }
    if (!email) {
      setError("Email không được để trống");
      return;
    }
    if (!password) {
      setError("password không được để trống");
      return;
    }
    if (!phone) {
      setError("Số điện thoại không được để trống");
      return;
    }
    if (!address) {
      setError("Địa chỉ không được để trống");
      return;
    }
    const data = (await useRegister({
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
    })) as RegisterResponse;
    if (data.statusCode === 400) {
      data.message && setError(data.message[0]);
      return;
    }
    if (data.statusCode === 409) {
      setError("Email đã tồn tại");
      return;
    }
    navigate("/");
  };
  return (
    <div className="login-page flex w-full items-center justify-center bg-white">
      <form onSubmit={handleSubmit}>
        <h1>ĐĂNG KÍ</h1>
        <div
          className={
            error?.toLowerCase().includes("họ")
              ? "form-field dangerous"
              : "form-field"
          }
        >
          <input
            placeholder="Họ"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div
          className={
            error?.toLowerCase().includes("tên")
              ? "form-field dangerous"
              : "form-field"
          }
        >
          <input
            placeholder="Tên"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div
          className={
            error?.toLowerCase().includes("email")
              ? "form-field dangerous"
              : "form-field"
          }
        >
          <input
            placeholder="Địa chỉ email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          className={
            error?.toLowerCase().includes("mật khẩu")
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
        <div
          className={
            error?.toLowerCase().includes("số điện thoại")
              ? "form-field dangerous"
              : "form-field"
          }
        >
          <input
            placeholder="Số điện thoại"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div
          className={
            error?.toLowerCase().includes("địa chỉ")
              ? "form-field dangerous"
              : "form-field"
          }
        >
          <input
            placeholder="Địa chỉ"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-field">
          <button type="submit">Đăng kí</button>
        </div>
        <div className="register-link">
          <p>
            Bạn đã có tài khoản?
            <a href="/login"> Đăng nhập</a>
          </p>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
