import { useMutation } from "@apollo/client";
import { gapi } from "gapi-script";
import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../config/toast";
import { useLoading } from "../../hooks/loadingContext";
import { useUserAuth } from "../../hooks/userContext";
import { GOOGLE_QUERY } from "../../query/google";
import "./googleLogin.scss";

export default function MyGoogleLogin() {
  const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const googleKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const myGoogleKey = import.meta.env.VITE_MY_GOOGLE_KEY;
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const { update } = useUserAuth();
  const [googleFunc] = useMutation(GOOGLE_QUERY);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleClientID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  function onSuccess(resp: any) {
    const googleObj = resp.profileObj;
    // console.log(resp);
    // console.log(googleObj);
    const obj = {
      name: resp.profileObj.name,
      email: resp.profileObj.email,
      googleId: resp.profileObj.googleId,
    };
    googleFunc({
      variables: {
        googleId: obj.googleId,
        googleKey: myGoogleKey,
        email: obj.email,
        name: obj.name,
      },
    })
      .then((resp) => {
        setLoading(false);
        const user = resp.data.google;
        update(user);
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        toastError(err.message);
      });
  }

  function onFailure(resp: any) {
    setLoading(false);
    toastError("Failed to login with google");
  }

  return (
    <div
      onClick={() => {
        setLoading(true);
      }}
      className="google-sign-in"
    >
      <GoogleLogin
        className="google"
        clientId={googleClientID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      ></GoogleLogin>
    </div>
  );
}
