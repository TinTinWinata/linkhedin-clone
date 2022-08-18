import React, { useState } from "react";
import { useUserAuth } from "../../hooks/userContext";
import MessageList from "./message-list/message-list";
import "./message.scss";
import MessageUser from "./people/message-user";
import Pusher from "pusher-js";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MESSAGE_QUERY, MESSAGE_QUERY } from "../../query/message";
import { toastError } from "../../config/toast";

export default function Message() {
  const { user } = useUserAuth();

  const [messageFunc] = useMutation(MESSAGE_QUERY);

  const [selectedUser, setSelectedUser] = useState({
    name: "Contact Person",
    id: "",
  });
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  let allMessages: any = [];

  const pusher = new Pusher("9e320ff2624435fef743", {
    cluster: "ap1",
  });

  const { refetch } = useQuery(GET_MESSAGE_QUERY);
  const channel = pusher.subscribe("message");

  function bindChannel(id: any) {
    // console.log("id : ", id);
    // console.log("channel : ", getChannel(id));
    refetch({
      id: getChannel(id),
    })
      .then((resp) => {
        const oldData = resp.data.getAllMessage;
        setMessages(
          oldData.map((e: any) => {
            return { message: e.Message, username: e.User.name };
          })
        );
      })
      .catch((err) => {
        toastError(err.message);
      });
    channel.bind(getChannel(id), function (data: any) {
      // allMessages.push(data);
      setMessages((prev: any) => [...prev, data]);
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (selectedUser.id == "") {
      toastError("Please select any user before send");
      return;
    }
    messageFunc({
      variables: {
        userId: selectedUser.id,
        message: message,
      },
    })
      .then((resp) => {
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        toastError(err.messages);
      });
  }

  function getChannel(id: any) {
    if (user.id < id) {
      return user.id + id;
    } else {
      return id + user.id;
    }
  }

  return (
    <div className="message-container">
      <div className="message shadow">
        <h2>Message</h2>
        {user && user.ConnectedUser !== undefined
          ? user.ConnectedUser.map((id: any) => {
              return (
                <MessageList
                  bind={bindChannel}
                  setUser={setSelectedUser}
                  key={id}
                  id={id}
                ></MessageList>
              );
            })
          : ""}
      </div>
      <div className="chat shadow">
        <div className="hide-scroll chat-container">
          <h2>{selectedUser.name}</h2>
          <hr className="black"></hr>
          {messages.map((msg: any, idx: any) => {
            return (
              <div key={idx}>
                <h3>{msg.username}</h3>
                <p>{msg.message}</p>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
