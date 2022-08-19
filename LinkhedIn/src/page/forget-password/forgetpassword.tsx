import React, { useState } from "react";
import "./forgetpassword.scss";
import emailjs from "emailjs-com";
import { toastError, toastSuccess } from "../../config/toast";
import { useMutation } from "@apollo/client";
import { REQUEST_CHANGE_PASSWORD_QUERY } from "../../query/password";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../hooks/loadingContext";
// import dotenv from "dotenv";

export default function Forgetpassword() {
  const { setLoading } = useLoading();
  const mainLink = import.meta.env.VITE_APP_LINK;
  const [requestFunc] = useMutation(REQUEST_CHANGE_PASSWORD_QUERY);

  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    requestFunc({ variables: { email: email } })
      .then((resp) => {
        setLoading(false);
        toastSuccess("Please see your gmail for the change password request!");
      })
      .catch((err) => {
        setLoading(false);
        toastError(err.message);
      });
  }

  return (
    <div className="forget-password center">
      <div className="container">
        <form className="shadow" onSubmit={handleSubmit} action="">
          <h1>Forget Password</h1>
          <p>Reset password in two quick steps</p>
          <input type="hidden" name="link" value="" />
          <div className="flex flex-col">
            <input
              className="input-border"
              placeholder="example@gmail.com"
              type="text"
              name="email"
            />
            <button type="submit">Reset Password</button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="backbtn"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
