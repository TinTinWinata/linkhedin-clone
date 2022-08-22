import "./sendMessage.scss";
import React, { useState } from "react";
import SendMessage from "../../../component/Popup/SendMessage/sendMessage";
import { useUserAuth } from "../../../hooks/userContext";
import { FaLock } from "react-icons/fa";

export default function SendMessageButton(props: any) {
  const thisUser = props.user;
  const { user } = useUserAuth();

  const [popup, setPopup] = useState<boolean>(false);

  function handleClick() {
    setPopup(true);
  }

  function isValid() {
    if (user.ConnectedUser.includes(thisUser.id)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {popup ? (
        <SendMessage user={thisUser} setHandle={setPopup}></SendMessage>
      ) : (
        ""
      )}
      {isValid() ? (
        <div className="send-message-button" onClick={handleClick}>
          Send Message
        </div>
      ) : (
        <div className="send-message-button flex">
          <div className="second-button">Send Message</div>
          <div className="center">
            <FaLock className="ml-2"></FaLock>
          </div>
        </div>
      )}
    </>
  );
}
