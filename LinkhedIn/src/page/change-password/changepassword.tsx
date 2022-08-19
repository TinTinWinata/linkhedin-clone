import React, { useState } from "react";
import "./changepassword.scss";
import emailjs from "emailjs-com";
import { toastError, toastSuccess } from "../../config/toast";
import { useMutation } from "@apollo/client";
import {
  CHANGE_PASSWORD_QUERY,
  REQUEST_CHANGE_PASSWORD_QUERY,
} from "../../query/password";
import { useNavigate, useParams } from "react-router-dom";
// import dotenv from "dotenv";

export default function ChangePassword() {
  const { id } = useParams();
  const mainLink = import.meta.env.VITE_APP_LINK;
  const [changeFunc] = useMutation(CHANGE_PASSWORD_QUERY);

  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmpassword = e.target.confirmpassword.value;
    if (confirmpassword !== password) {
      toastError("Please make a valid password!");
      return;
    }
    changeFunc({ variables: { password: password, id: id } })
      .then((resp) => {
        toastSuccess("Succesfully change password");
        navigate("/login");
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  return (
    <div className="forget-password center">
      <div className="container">
        <form className="shadow" onSubmit={handleSubmit} action="">
          <h1>Change Password</h1>
          <p>Please remember your password!</p>
          <input type="hidden" name="link" value="" />
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              className="input-border"
              placeholder="*******************"
              type="password"
              name="password"
            />
            <label htmlFor="">Confirm Password</label>
            <input
              className="input-border"
              placeholder="*******************"
              type="password"
              name="confirmpassword"
            />
            <button type="submit">Change Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
