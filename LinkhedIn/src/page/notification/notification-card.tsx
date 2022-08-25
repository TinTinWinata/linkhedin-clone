import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../config/toast";
import { DELETE_NOTIFICATION_QUERY } from "../../query/notification";

export default function NotificationCard(props: any) {
  const data = props.data;
  const refetch = props.refetch;
  const navigate = useNavigate();

  const [onHover, setOnOHover] = useState<boolean>(false);

  const [deleteFunc] = useMutation(DELETE_NOTIFICATION_QUERY);

  function handleClick() {
    if (onHover) return;
    navigate(data.link);
    deleteFunc({ variables: { id: data.id } })
      .then((resp) => {})
      .catch((err) => {
        toastError(err.message);
      });
  }
  function handleDelete() {
    deleteFunc({ variables: { id: data.id } })
      .then((resp) => {
        refetch();
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  const link =
    data.senderPhotoUrl === ""
      ? "https://picsum.photos/seed/picsum/200/300"
      : data.senderPhotoUrl;
  return (
    <div onClick={handleClick} key={data.id} className="notification-card">
      <div className="flex">
        <div className="center">
          <img src={link} alt="" />
        </div>
        <div className="center">
          <div className="txt">
            <p>{data.text}</p>
            <p className="sender-name color-invic">{data.senderName}</p>
          </div>
        </div>

        {/* Button */}
        {data.link !== "" ? (
          <div className="center">
            <div className="flex ml-4">
              <div
                onClick={handleDelete}
                onMouseEnter={() => {
                  setOnOHover(true);
                }}
                onMouseLeave={() => {
                  setOnOHover(false);
                }}
                className="second-button"
              >
                Delete
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
