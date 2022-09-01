import { useMutation, useQuery } from "@apollo/client";
import React, { createRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import ReactSelect from "react-select";
import { toastSuccess } from "../../../config/toast";
import { useUserAuth } from "../../../hooks/userContext";
import { MESSAGE_QUERY } from "../../../query/message";
import { SEND_POST_QUERY } from "../../../query/post";
import { GET_CONNECTED_USER_QUERY } from "../../../query/user";
import { getChannel, sendMessageFirebase } from "../../../script/helper";
import "./sendProfile.scss";

export default function SendProfile(props: any) {
  const id = props.id;
  const { data } = useQuery(GET_CONNECTED_USER_QUERY);
  const [messageFunc] = useMutation(MESSAGE_QUERY);
  const valueRef = createRef<any>();
  const { user } = useUserAuth();
  function handleClose() {
    props.setHandle(false);
  }

  if (!data) {
    return <></>;
  }

  function handleSubmit(e: any) {
    if (!id) return;
    e.preventDefault();
    const arrValue = valueRef.current.getValue();
    const userId = arrValue[0].value;
    messageFunc({
      variables: {
        userId: userId,
        message: `I Shared you a User Profile`,
        link: "/profile/" + id,
      },
    }).then(() => {
      sendMessageFirebase(
        getChannel(userId, user.id),
        "I Shared you a User Profile",
        user.name,
        "/profile/" + id
      ).then(() => {
        toastSuccess("Succesfully send user profile!");
        handleClose();
      });
    });
  }

  return (
    <>
      <div className="popup"></div>
      <div className="popup-container send-post-popup">
        <form action="" onSubmit={handleSubmit}>
          <FaTimes onClick={handleClose} id="x-icon"></FaTimes>
          <h3 className="mb-2">Search Your Connected User</h3>
          <ReactSelect
            ref={valueRef}
            className="mb-3 mt-2"
            options={data.searchConnected.map((data: any) => {
              return { value: data.id, label: data.name };
            })}
          ></ReactSelect>
          <div className="center">
            <button className="mt-2">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
