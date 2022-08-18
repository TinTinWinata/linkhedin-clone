import { useQuery } from "@apollo/client";
import React from "react";
import { FIND_USER_QUERY } from "../../../query/user";

export default function MessageList(props: any) {
  const { data } = useQuery(FIND_USER_QUERY, { variables: { id: props.id } });

  function handleClick() {
    if (data) {
      props.setUser(data.user);
      props.bind(data.user.id);
    }
  }

  return (
    <div onClick={handleClick} className="message-user">
      {data ? data.user.name : ""}
    </div>
  );
}
