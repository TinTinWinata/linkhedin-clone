import { useMutation } from "@apollo/client";
import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../config/toast";
import { useLoading } from "../../hooks/loadingContext";
import { useUserAuth } from "../../hooks/userContext";
import Information from "../../page/register/information/information";
import { GOOGLE_QUERY } from "../../query/google";
import "./googleRegister.scss";

export default function MyGoogleRegister() {
  const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const googleKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const myGoogleKey = import.meta.env.VITE_MY_GOOGLE_KEY;
  const navigate = useNavigate();
  const [handle, setHandle] = useState<boolean>(false);
  const { update } = useUserAuth();
  const [googleFunc] = useMutation(GOOGLE_QUERY);
  const [user, setUser] = useState({ id: "" });
  const { setLoading } = useLoading();

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
        const user = resp.data.google;
        setUser(user);
        update(user);
        setHandle(true);
        setLoading(false);
        navigate("/information/" + user.id);
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
    <>
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
    </>
  );
}
