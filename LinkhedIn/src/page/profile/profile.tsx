import { useMutation, useQuery } from "@apollo/client";
import { setDefaultResultOrder } from "dns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../config/toast";
import { useLoading } from "../../hooks/loadingContext";
import { useUserAuth } from "../../hooks/userContext";
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
  console.log(user);

  const { data } = useQuery(FIND_USER_QUERY, {
    variables: { id: id },
  });

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

  function handleConnect() {}

  return (
    <div className="profile">
      <div className="profile-container">
        <img src="https://picsum.photos/id/237/200/300" alt="" />
        {data && user.id !== data.user.id ? (
          <>
            <button onClick={handleFollow}>Follow</button>
            <button>Connect</button>
          </>
        ) : (
          ""
        )}

        <p>{data ? data.user.name : ""}</p>
      </div>
    </div>
  );
}
