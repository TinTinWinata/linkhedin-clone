import { useMutation, useQuery } from "@apollo/client";
import { setDefaultResultOrder } from "dns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../config/toast";
import { useLoading } from "../../hooks/loadingContext";
import { useUserAuth } from "../../hooks/userContext";
import { CONNECT_REQUEST_QUERY } from "../../query/connect";
import { FIND_USER_QUERY, FOLLOW_USER_QUERY } from "../../query/user";
import "./profile.scss";

export default function Profile() {
  const { id } = useParams();
  const { user } = useUserAuth();

  const { setLoading } = useLoading();
  // const [profile, setProfile] = useState({
  //   name: "",
  // });
  const navigate = useNavigate();

  const { data } = useQuery(FIND_USER_QUERY, {
    variables: { id: id },
  });

  const [connectFunc] = useMutation(CONNECT_REQUEST_QUERY);
  const [followFunc] = useMutation(FOLLOW_USER_QUERY);

  function handleFollow() {
    followFunc({ variables: { id: id } })
      .then((resp) => {
        toastSuccess("Succesfully follow " + data.user.name);
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  function handleConnect() {
    connectFunc({ variables: { id: id } })
      .then((resp) => {
        toastSuccess("Succesfully send request to " + data.user.name);
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  return (
    <div className="center">
      <div className="profile">
        <div className="profile-container shadow">
          <label htmlFor="input-file">
            <img src="https://picsum.photos/id/237/200/300" alt="" />
          </label>
          <input id="input-file" type="file" />

          {data && user.id !== data.user.id ? (
            <>
              <button onClick={handleFollow}>Follow</button>
              <button onClick={handleConnect}>Connect</button>
            </>
          ) : (
            ""
          )}
          <p>{data ? data.user.name : ""}</p>
          <p>{data ? data.user.email : ""}</p>
        </div>
      </div>
    </div>
  );
}
