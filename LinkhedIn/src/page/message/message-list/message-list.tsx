import { useQuery } from "@apollo/client";
import React from "react";
import { FIND_USER_QUERY } from "../../../query/user";

export default function MessageList(props: any) {
  const { data } = useQuery(FIND_USER_QUERY, { variables: { id: props.id } });
  const search = props.search;

  function handleClick() {
    if (data) {
      props.setUser(data.user);
      props.bind(data.user.id);
    }
  }
  if (!data) {
    return <></>;
  }

  if (data.user.name.toLowerCase().includes(search.toLowerCase())) {
    return (
      <div onClick={handleClick} className="message-user">
        {data ? data.user.name : ""}
      </div>
    );
  }

  return <></>;
}
