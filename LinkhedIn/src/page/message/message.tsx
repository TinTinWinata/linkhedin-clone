import React, { useState } from "react";
import { useUserAuth } from "../../hooks/userContext";
import MessageList from "./message-list/message-list";
import "./message.scss";
import MessageUser from "./people/message-user";
import Pusher from "pusher-js";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MESSAGE_QUERY, MESSAGE_QUERY } from "../../query/message";
import { toastError } from "../../config/toast";
import { FaImage, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { sendImage } from "../../script/image";

export default function Message() {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  const [messageFunc] = useMutation(MESSAGE_QUERY);

  const [selectedUser, setSelectedUser] = useState({
    name: "Contact Person",
    id: "",
  });
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");

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
    sendMessage(message);
  }

  function sendMessage(msg: any) {
    messageFunc({
      variables: {
        userId: selectedUser.id,
        message: msg,
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

  function handleChangeImage(e: any) {
    const img = e.target.files[0];
    sendImage(img).then((url) => {
      sendMessage(url);
    });
  }

  function handlePhone() {
    navigate("/room-create");
  }

  return (
    <div className="message-container h-min-max">
      <div className="message shadow">
        <h2>Message</h2>
        {user && user.ConnectedUser !== undefined
          ? user.ConnectedUser.map((id: any) => {
              if (user.BlockedUser.includes(id)) {
                return <></>;
              }
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
          <div className="flex space-between">
            <h2>{selectedUser.name}</h2>
            <div className="center">
              <FaPhone onClick={handlePhone} className="phone-icon"></FaPhone>
            </div>
          </div>
          <hr className="black"></hr>
          {messages.map((msg: any, idx: any) => {
            return <MessageUser key={idx} msg={msg}></MessageUser>;
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <input
              type="text"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
            <button type="submit">Send</button>
            <div className="center">
              <label htmlFor="input-image">
                <FaImage className="image-icon"></FaImage>
              </label>
              <input
                onChange={handleChangeImage}
                className="none"
                id="input-image"
                type="file"
                accept="image"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
