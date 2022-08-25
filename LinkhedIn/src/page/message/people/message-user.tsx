import { useQuery } from "@apollo/client";
import React from "react";
import { isAFirebaseImage } from "../../../script/helper";

export default function MessageUser(props: any) {
  const msg = props.msg;

  if (isAFirebaseImage(msg.message)) {
    return (
      <div className="msg-container">
        <h3>{msg.username}</h3>
        <img src={msg.message} alt="" />
      </div>
    );
  }
  if (msg.link === undefined || msg.link === "") {
    return (
      <div className="msg-container">
        <h3>{msg.username}</h3>
        <p>{msg.message}</p>
      </div>
    );
  }
  return (
    <div className="msg-container">
      <h3>{msg.username}</h3>
      <a href={msg.link}>
        <p>{msg.message}</p>
      </a>
    </div>
  );
}
