import React from "react";
import "./css-register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  return (
    <>
      <div className="register-container">
        <div className="register-to-login">
          <p>Doesn't have any account yet ? </p>
          <b onClick={handleLogin}>Login</b>
        </div>
        <div className="register-image"></div>
        <div className="register-form">
          <form action="">
            <h2>Sign Up Your Account</h2>
            <div className="register-form-content">
              <label htmlFor="email">Email</label>
              <input type="email" />
            </div>
            <div className="register-form-content">
              <label htmlFor="name">Name</label>
              <input type="name" />
            </div>
            <div className="register-form-content">
              <label htmlFor="password">Password</label>
              <input type="password" />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
