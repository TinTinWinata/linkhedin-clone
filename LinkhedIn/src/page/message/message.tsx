import React, { useState } from "react";
import { useUserAuth } from "../../hooks/userContext";
import MessageList from "./message-list/message-list";
import "./message.scss";
import MessageUser from "./people/message-user";
import Pusher from "pusher-js";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MESSAGE_QUERY, MESSAGE_QUERY } from "../../query/message";
import { toastError } from "../../config/toast";
import { FaCalendar, FaImage, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { sendImage } from "../../script/image";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import VideoSchedule from "../../component/Popup/CreateVideoSchedule/videoSchedule";

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
    refetch({
      id: getChannel(id),
    })
      .then((resp) => {
        const oldData = resp.data.getAllMessage;
        setMessages(
          oldData.map((e: any) => {
            return { message: e.Message, username: e.User.name, link: e.Link };
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
        link: "",
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

  async function handlePhone() {
    if (selectedUser.id !== "") {
      const callDoc = await doc(collection(db, "calls"));
      await setDoc(callDoc, {
        created: false,
      });
      await messageFunc({
        variables: {
          userId: selectedUser.id,
          message: `TinTin has been made a call please click to join the call`,
          link: "/server/" + callDoc.id,
        },
      });
      navigate("/server/" + callDoc.id);
    }
  }

  function videoSchedule() {}

  const [search, setSearch] = useState<string>("");
  const [handleVideoSchedule, setHandleVideoSchedule] =
    useState<boolean>(false);

  return (
    <>
      {handleVideoSchedule && selectedUser.id !== "" ? (
        <VideoSchedule
          selectedUser={selectedUser}
          setHandle={setHandleVideoSchedule}
        ></VideoSchedule>
      ) : (
        ""
      )}
      <div className="center-x h-min-max">
        <div className="message-container">
          <div className="message box">
            <div className="flex flex-col mb-3">
              <h3 className="ml-2">Messaging</h3>
              <input
                placeholder="Search connected"
                onChange={(e: any) => {
                  setSearch(e.target.value);
                }}
                value={search}
                type="text"
                className="input-border ml-2"
              />
            </div>
            {user && user.ConnectedUser !== undefined
              ? user.ConnectedUser.map((id: any) => {
                  if (user.BlockedUser.includes(id)) {
                    return <></>;
                  }
                  return (
                    <MessageList
                      search={search}
                      bind={bindChannel}
                      setUser={setSelectedUser}
                      key={id}
                      id={id}
                    ></MessageList>
                  );
                })
              : ""}
          </div>
          <div className="box chat">
            <div className="hide-scroll chat-container">
              <div className="flex space-between">
                <h2>{selectedUser.name}</h2>
                <div className="center">
                  <FaPhone
                    onClick={handlePhone}
                    className="phone-icon"
                  ></FaPhone>
                  <FaCalendar
                    className="phone-icon"
                    onClick={() => {
                      if (selectedUser.id !== "") setHandleVideoSchedule(true);
                    }}
                  ></FaCalendar>
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
                  className="input-border"
                  type="text"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  value={message}
                />
                <button type="submit">Send</button>
                <div className="center mr-3">
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
      </div>
    </>
  );
}
