import React from "react";
import "./css-login.scss";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { useUserAuth } from "../../hooks/userContext";
import LOGIN_QUERY from "../../query/login";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../../config/toast";
import { useLoading } from "../../hooks/loadingContext";

export default function Login() {
  const navigate = useNavigate();

  const { update, getUser } = useUserAuth();
  const { setLoading } = useLoading();
  const [loginFunc, { data, loading, error }] = useMutation(LOGIN_QUERY);

  useEffect(() => {
    const user = getUser();
    console.log("user : ", user);
    if (user.token !== undefined) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (data && data.login.token !== "undefined") {
      const user = data.login;
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
      toastError(error.message);
    }
  }, [error]);

  function handleSubmit(e: any) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginFunc({ variables: { email: email, password: password } });
    e.target.email.value = "";
    e.target.password.value = "";
  }

  function handleRegister() {
    navigate("/register");
  }

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} action="">
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
