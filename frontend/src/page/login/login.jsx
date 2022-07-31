import React from "react";
import "./css-login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleRegister() {
    navigate("/register");
  }

  return (
    <>
      <div className="login-container">
        <form action="">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="register">
        <p>Doesn't have any account yet ? </p>
        <b onClick={handleRegister}>Register</b>
      </div>
    </>
  );
}
