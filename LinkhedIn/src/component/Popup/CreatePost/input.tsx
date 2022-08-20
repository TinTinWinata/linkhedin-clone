import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { MentionsInput, Mention } from "react-mentions";
import { GET_HASHTAG_QUERY } from "../../../query/hashtag";
import { GET_USER_QUERY } from "../../../query/user";
import mentionInputStyle from "./mentionInputStyle";
import mentionStyle from "./mentionStyle";

export default function Input(props: any) {
  const { data } = useQuery(GET_USER_QUERY);
  const [users, setUsers] = useState([]);
  const [hashtag, setHashtag] = useState([]);
  const hashtagData = useQuery(GET_HASHTAG_QUERY);

  useEffect(() => {
    if (hashtagData.data && hashtagData.data.length !== 0) {
      const data = hashtagData.data.getAllHashtag;
      setHashtag(
        data.map((data: any) => {
          return { id: data, display: data };
        })
      );
    }
  }, [hashtagData]);

  useEffect(() => {
    if (data) {
      setUsers(
        data.users.map((data: any) => {
          return { id: data.id, display: "@" + data.name };
        })
      );
    }
  }, [data]);

  const value = props.value;
  const setValue = props.setValue;
  return (
    <MentionsInput
      style={mentionInputStyle}
      className="mention-input"
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value);
      }}
    >
      <Mention
        trigger="@"
        style={mentionStyle}
        data={users}
        // renderSuggestion={}
      />
      <Mention
        trigger="#"
        style={mentionStyle}
        data={hashtag}
        // renderSuggestion={}
      />
    </MentionsInput>
  );
}
