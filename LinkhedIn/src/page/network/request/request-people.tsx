import { useMutation, useQuery } from "@apollo/client";
import { Console } from "console";
import React, { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../../config/toast";
import { useRefetch } from "../../../hooks/refetchContext";
import {
  ACCEPT_REQUEST_QUERY,
  IGNORE_REQUEST_QUERY,
} from "../../../query/connect";
import { FIND_USER_QUERY } from "../../../query/user";
import "../network.scss";

export default function RequestPeople(props: any) {
  const { data } = useQuery(FIND_USER_QUERY, { variables: { id: props.id } });
  const { refetchUser } = useRefetch();

  const [ignoreFunc] = useMutation(IGNORE_REQUEST_QUERY);
  const [acceptFunc] = useMutation(ACCEPT_REQUEST_QUERY);

  function handleAccept() {
    acceptFunc({ variables: { id: props.id } })
      .then((resp) => {
        refetchUser();
        toastSuccess("Succesfully connected to " + data.user.name);
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  function handleIgnore() {
    ignoreFunc({ variables: { id: props.id } })
      .then((resp) => {
        refetchUser();
        toastSuccess("Succesfully Ignore " + data.user.name);
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  return (
    <div className="request-people">
      <div className="name">{data ? data.user.name : ""}</div>
      <div className="btn flex">
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleIgnore}>Ignore</button>
      </div>
    </div>
  );
}
