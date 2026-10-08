import React from "react";
import logo from "../../assets/icons/logo.png";

import "./register.scss";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="register">
      <form className="register__card" onSubmit={handleSubmit}>
        <img className="register__logo" src={logo} alt="Tahrir" />

        <label className="register__label">
          To'liq ism
          <input type="text" placeholder="Ism va familiyangiz" required />
        </label>

        <label className="register__label">
          Elektron pochta
          <input type="email" placeholder="ismingiz@mail.uz" required />
        </label>

        <label className="register__label">
          Parol
          <input
            type="password"
            placeholder="Kamida 8 ta belgi"
            minLength={8}
            required
          />
        </label>

        <label className="register__label">
          Parolni tasdiqlang
          <input
            type="password"
            placeholder="Parolni qayta kiriting"
            minLength={8}
            required
          />
        </label>

        <button type="submit" className="register__btn">
          Ro'yxatdan o'tish
        </button>

        <p className="register__text">
          Hisobingiz bormi? <a href="/login">Kiring</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
