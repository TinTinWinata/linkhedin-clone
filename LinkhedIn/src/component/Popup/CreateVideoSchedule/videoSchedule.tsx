import { useMutation } from "@apollo/client";
import { collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { db } from "../../../config/firebase";
import { useUserAuth } from "../../../hooks/userContext";
import { MESSAGE_QUERY } from "../../../query/message";
import { getChannel, sendMessageFirebase } from "../../../script/helper";

import "./videoSchedule.scss";
export default function VideoSchedule({
  setHandle,
  selectedUser,
}: {
  setHandle: any;
  selectedUser: any;
}) {
  const [messageFunc] = useMutation(MESSAGE_QUERY);
  const navigate = useNavigate();
  const { user } = useUserAuth();

  async function handleSubmit(e: any) {
    e.preventDefault();

    const time = e.target.time.value;
    const date = e.target.date.value;

    console.log("time : ", time);
    console.log("date : ", date);
    const dateObj: any = new Date(date + " " + time);

    if (selectedUser.id !== "") {
      const callDoc = await doc(collection(db, "calls"));
      await setDoc(callDoc, {
        created: false,
        time: dateObj,
      });

      await messageFunc({
        variables: {
          userId: selectedUser.id,
          message: `TinTin has been scheduled call with you at ${
            date + " " + time
          }`,
          link: "/server/" + callDoc.id,
        },
      });
      sendMessageFirebase(
        getChannel(selectedUser.id, user.id),
        `TinTin has been scheduled call with you at ${date + " " + time}`,
        user.name,
        "/server/" + callDoc.id
      ).then(() => {
        navigate("/server/" + callDoc.id);
      });
    }
  }

  return (
    <>
      <div className="popup"></div>
      <form onSubmit={handleSubmit} className="popup-container video-schedule">
        <FaTimes
          onClick={() => {
            setHandle(false);
          }}
          className="x-icon"
        ></FaTimes>
        <h2>Insert Date</h2>
        <input className="input-border" type="date" name="date" id="" />
        <input className="input-border" type="time" name="time" id="" />
        <button>Submit</button>
      </form>
    </>
  );
}
