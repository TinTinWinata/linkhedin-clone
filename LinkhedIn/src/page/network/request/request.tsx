import "../network.scss";

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useUserAuth } from "../../../hooks/userContext";
import { useRefetch } from "../../../hooks/refetchContext";
import RequestPeople from "./request-people";
import UserMightKnow from "../../user-might-know/userMightKnow";

export default function Request() {
  const { refetchUser } = useRefetch();
  const { user } = useUserAuth();

  useEffect(() => {
    refetchUser();
  }, []);

  return (
    <div className="network-request">
      <div className="shadow container">
        <h2 className="color-first header">Request List</h2>
        {user.RequestConnect && user.RequestConnect.length == 0 ? (
          <p className="no-have-request">You don't have any request yet</p>
        ) : (
          ""
        )}
        {user.RequestConnect
          ? user.RequestConnect.map((req: any, idx: any) => {
              return (
                <RequestPeople
                  key={req}
                  id={req}
                  text={user.RequestConnectTxt[idx]}
                ></RequestPeople>
              );
            })
          : ""}
      </div>
      <UserMightKnow></UserMightKnow>
    </div>
  );
}
