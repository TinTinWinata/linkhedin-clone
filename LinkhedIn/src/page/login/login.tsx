import React from "react";
import "./css-login.scss";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { useUserAuth } from "../../hooks/userContext";
import LOGIN_QUERY from "../../query/login";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../../config/toast";
import { useLoading } from "../../hooks/loadingContext";
import GoogleLogin from "react-google-login";
import MyGoogleLogin from "../../component/GoogleLogin/googleLogin";

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
      console.log(data.login);
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

  function handleForgotPassword() {
    navigate("/forget-password");
  }

  return (
    <>
      <div className="flex flex-col login-container">
        <form onSubmit={handleSubmit} action="" className="shadow">
          <h1>Sign In</h1>
          <p>Stay updated on your professional world</p>
          <input name="email" placeholder="Email" type="email" />
          <input name="password" placeholder="Password" type="password" />
          <h3 onClick={handleForgotPassword} className="color-first">
            Forgot Password ?
          </h3>
          <button type="submit">Sign In</button>
          <div className="or-txt flex">
            <div className="my-border"></div>
            <p>or</p>
            <div className="my-border"></div>
          </div>
          <MyGoogleLogin></MyGoogleLogin>
        </form>
        <div className="text flex">
          <p>New to LinkhedIn ?</p>
          <Link className="color-first register-txt" to="/register">
            Join Now
          </Link>
        </div>
      </div>
    </>
  );
}
