import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "../../hooks/loadingContext";
import { SEARCH_QUERY } from "../../query/search";
import UserCard from "./card/user-card";
import "./search.scss";

export default function Search() {
  const { query } = useParams();
  const [search, setSearch] = useState();
  const { data, loading, error } = useQuery(SEARCH_QUERY, {
    variables: { query: query },
  });

  const { setLoading } = useLoading();

  // useEffect(() => {
  //   if (loading) {
  //     setLoading(true);
  //   } else if (loading == false) {
  //     setLoading(false);
  //   }
  // }, [loading]);
  console.log(data);
  console.log(error);

  return (
    <div className="search">
      {data ? (
        <div className="search-container shadow">
          {data.search.user.map((user: any) => {
            return <UserCard user={user}></UserCard>;
          })}
          {data.search.post.map((post: any) => {
            return <p>{post.text}</p>;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
