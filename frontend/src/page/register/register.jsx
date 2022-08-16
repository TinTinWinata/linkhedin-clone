import React, { useEffect } from "react";
import "./css-register.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import REGISTER_QUERY, { REGISTER_TEST } from "../../query/register";
import { useUserAuth } from "../../hooks/userContext";
import { useLoading } from "../../hooks/loadingContext";
import { toastError } from "../../config/toast";

export default function Register() {
  const navigate = useNavigate();
  const [registerFunc, { data, loading, error }] = useMutation(REGISTER_QUERY);
  const { update } = useUserAuth();
  const { setLoading } = useLoading();

  useEffect(() => {
    console.log(data);
    if (data && data.register.token !== undefined) {
      const user = data.register;
      update(user);
      navigate("/home");
    }
  }, [data]);

  useEffect(() => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      if (error.message === "must not be null") {
        toastError("User already register!");
      } else {
        toastError(error.message);
      }
    }
  }, [error]);

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const input = {
      name: name,
      email: email,
      password: password,
    };
    registerFunc({ variables: { input: input } });
  }

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
          <form onSubmit={handleSubmit} action="">
            <h2>Sign Up Your Account</h2>
            <div className="register-form-content">
              <label htmlFor="email">Email</label>
              <input name="email" type="email" />
            </div>
            <div className="register-form-content">
              <label htmlFor="name">Name</label>
              <input name="name" type="name" />
            </div>
            <div className="register-form-content">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
