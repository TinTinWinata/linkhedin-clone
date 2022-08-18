import React, { useState } from "react";
import "./forgetpassword.scss";
import emailjs from "emailjs-com";
import { toastError, toastSuccess } from "../../config/toast";
import { useMutation } from "@apollo/client";
import { REQUEST_CHANGE_PASSWORD_QUERY } from "../../query/password";

export default function Forgetpassword() {
  // const mainLink = process.env.REACT_APP_LINK;
  const [requestFunc] = useMutation(REQUEST_CHANGE_PASSWORD_QUERY);

  function handleSubmit(e: any) {
    e.preventDefault();
    const email = e.target.email.value;
    requestFunc()
      .then((resp) => {
        // const link = resp.data;
        console.log(resp.data);
      })
      .catch((err) => {});
  }

  function sendEmail(e: any) {
    emailjs
      .sendForm(
        "service_foqc3oe",
        "template_pnz25ei",
        e.target,
        "0Ek5tzfjp6YnSnvu5"
      )
      .then(
        (result) => {
          toastSuccess(
            "Please see your gmail for the change password request!"
          );
        },
        (error) => {
          toastError(error.text);
        }
      );
  }

  return (
    <div className="forget-password center">
      <div className="container">
        <form onSubmit={handleSubmit} action="">
          <h1>Forget Password</h1>
          <p>Input your email</p>
          <input type="hidden" name="link" value="" />
          <input type="text" name="email" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
