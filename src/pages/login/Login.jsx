import React from "react";
import logo from "../../assets/icons/logo.png";

import "./login.scss";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <form className="login__card" onSubmit={handleSubmit}>
        <img className="login__logo" src={logo} alt="Tahrir" />

        <label className="login__label">
          Elektron pochta
          <input type="email" placeholder="ismingiz@mail.uz" required />
        </label>

        <label className="login__label">
          Parol
          <input type="password" placeholder="Parolingizni kiriting" required />
        </label>

        <button type="submit" className="login__btn">
          Kirish
        </button>

        <p className="login__text">
          Hisobingiz yo'qmi? <a href="/register">Ro'yxatdan o'ting</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
