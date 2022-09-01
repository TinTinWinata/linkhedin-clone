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
import "./sendpost.scss";

export default function SendPost(props: any) {
  const post = props.post;
  const refetch = props.refetch;
  const { user } = useUserAuth();
  const { data } = useQuery(GET_CONNECTED_USER_QUERY);
  const [messageFunc] = useMutation(MESSAGE_QUERY);
  const [sendFunc] = useMutation(SEND_POST_QUERY);
  const valueRef = createRef<any>();
  function handleClose() {
    props.setHandle(false);
  }

  if (!data) {
    return <></>;
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const arrValue = valueRef.current.getValue();
    const userId = arrValue[0].value;
    messageFunc({
      variables: {
        userId: userId,
        message: `I Shared you a Post (${post.text})`,
        link: "/post/" + post.id,
      },
    }).then(() => {
      sendFunc({ variables: { postId: post.id } }).then((resp) => {
        refetch().then(() => {
          sendMessageFirebase(
            getChannel(user.id, userId),
            `I Shared you a Post (${post.text})`,
            user.name,
            "/post/" + post.id
          ).then(() => {
            toastSuccess("Succesfully send post!");
            handleClose();
          });
        });
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
