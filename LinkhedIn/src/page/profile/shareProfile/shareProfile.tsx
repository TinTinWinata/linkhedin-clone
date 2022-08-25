import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import SendProfile from "../../../component/Popup/SendProfile/sendProfile";
import { MESSAGE_QUERY } from "../../../query/message";
import "./shareProfile.scss";

export default function ShareProfile(props: any) {
  const id = props.id;
  const [handle, setHandle] = useState<boolean>(false);

  function handleClick() {
    setHandle(true);
  }

  return (
    <>
      {handle ? <SendProfile id={id} setHandle={setHandle}></SendProfile> : ""}
      <div>
        <div className="second-button share-profile-button" onClick={handleClick}>
          Share Profile
        </div>
      </div>
    </>
  );
}
