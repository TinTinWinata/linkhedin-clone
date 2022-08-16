import React, { createRef, useEffect, useRef, useState } from "react";
import "./css-register.scss";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import REGISTER_QUERY, { REGISTER_TEST } from "../../query/register";
import { useUserAuth } from "../../hooks/userContext";
import { useLoading } from "../../hooks/loadingContext";
import { toastError, toastSuccess } from "../../config/toast";
import emailjs from "emailjs-com"

export default function Register() {
  const navigate = useNavigate();
  const [registerFunc, {  loading }] = useMutation(REGISTER_QUERY);
  const { update } = useUserAuth();
  const { setLoading } = useLoading();
  const [gmailValue, setGmailValue] = useState("");


  // useEffect(() => {
  //   console.log(data);
  //   if (data && data.register.token !== undefined) {
  //     const user = data.register;
  //     update(user);
  //     navigate("/home");
  //   }
  // }, [data]);

  useEffect(() => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading]);


  function handleSubmit(e : any) {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const input = {
      name: name,
      email: email,
      password: password, 
    };

    registerFunc({ variables: { input: input } }).then((resp)=>{
      toastSuccess("Succesfully created user");
      const data = resp.data
      if (data && data.register.token !== undefined) {
        sendEmail(e)
        navigate("/home");
        setLoading(false);
      }
    }).catch((err)=>{
      toastError(err.message);
    })
  }

  function sendEmail(e : any){
    console.log('sending email ...')
    emailjs.sendForm('service_foqc3oe', 'template_ajjo16z',e.target, '0Ek5tzfjp6YnSnvu5')
    .then((result) => {
      toastSuccess("Please see your gmail for the verification link!")
        // console.log(result.text);
    }, (error) => {
      toastError(error.text)
        // console.log(error.text);
    });
  }

  function handleLogin() {
    navigate("/login");
  }

  function gmailOnChange(e : any)
  {
    let val = e.target.value;
    val = val.replace('@', '')
    val = val.replace('.', '')
    setGmailValue(val)
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
            <input type="hidden" name="link" value={"http://127.0.0.1:5173/verification/" + gmailValue} />
            <div className="register-form-content">
              <label htmlFor="email">Email</label>
              <input name="email" type="email" onChange={gmailOnChange}/>
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
