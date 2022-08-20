import { useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactSelect from "react-select";
import { useLoading } from "../../hooks/loadingContext";
import { SEARCH_QUERY } from "../../query/search";
import PostCard from "../home/post-card/post-card";
import UserCard from "./card/user-card";
import "./search.scss";

export default function Search() {
  const { query } = useParams();
  const [search, setSearch] = useState();
  const { data, loading, error, refetch } = useQuery(SEARCH_QUERY, {
    variables: { query: query },
  });

  const { setLoading } = useLoading();
  const [value, setValue] = useState("all");

  const option = [
    {
      value: "user",
      label: "User",
    },
    {
      value: "post",
      label: "Post",
    },
    {
      value: "all",
      label: "All",
    },
  ];

  function handleChange(selectedOptions: any) {
    setValue(selectedOptions.value);
  }

  return (
    <div className="center-x search h-min-max">
      {data ? (
        <div className="search-container">
          <div className="flex">
            <h2 className="color-first">Search Result</h2>
            <ReactSelect
              onChange={handleChange}
              options={option}
              className="ml-3"
            ></ReactSelect>
          </div>

          {value === "all" || value === "user" ? (
            <div className="user-card">
              {data.search.user.map((user: any) => {
                return <UserCard user={user}></UserCard>;
              })}
            </div>
          ) : (
            ""
          )}
          {value === "all" || value === "post" ? (
            <div className="">
              {data.search.post.map((post: any, idx: any) => {
                return (
                  <PostCard
                    refetch={refetch}
                    data={post}
                    key={idx}
                    text={post.text}
                    link={post.AttachmentLink}
                  ></PostCard>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
