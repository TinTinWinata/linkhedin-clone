import "../network.scss";

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useUserAuth } from "../../../hooks/userContext";
import { useRefetch } from "../../../hooks/refetchContext";
import RequestPeople from "./request-people";

export default function Request() {
  const { refetchUser } = useRefetch();
  const { user } = useUserAuth();

  useEffect(() => {
    refetchUser();
  }, []);

  return (
    <div className="network-request">
      <h2>Request List</h2>
      <div className="shadow container">
        {user.RequestConnect
          ? user.RequestConnect.map((req: any) => {
              console.log(req);
              return <RequestPeople key={req} id={req}></RequestPeople>;
            })
          : ""}
      </div>
    </div>
  );
}
