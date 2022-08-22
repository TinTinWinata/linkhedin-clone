import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactSelect from "react-select";
import { useLoading } from "../../hooks/loadingContext";
import { SEARCH_QUERY } from "../../query/search";
import PostCard from "../home/post-card/post-card";
import UserCard from "./card/user-card";
import "./search.scss";
import ReactLoading from "react-loading";

export default function Search() {
  const { query } = useParams();
  const [search, setSearch] = useState();
  const { data, error, refetch } = useQuery(SEARCH_QUERY, {
    variables: { query: query },
  });

  const loadingTime = 2000;

  const perPage = 2;
  const [limit, setLimit] = useState<number>(perPage);

  const [loading, setLoading] = useState<boolean>(false);

  const [value, setValue] = useState("all");

  const observer = useRef<any>();
  const lastRef = useCallback((node: any) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          loadMore();
        }, loadingTime);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

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

  function loadMore() {
    setLimit((prev: any) => prev + perPage);
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
              {data.search.user.map((user: any, idx: any) => {
                if (idx >= limit) return;
                return <UserCard key={idx} user={user}></UserCard>;
              })}
            </div>
          ) : (
            ""
          )}
          {value === "all" || value === "post" ? (
            <div className="">
              {data.search.post.map((post: any, idx: any) => {
                if (idx >= limit) return;

                if (idx == limit - 1) {
                  console.log("hadir", idx);
                  return (
                    <div ref={lastRef} key={idx}>
                      <PostCard
                        refetch={refetch}
                        data={post}
                        text={post.text}
                        link={post.AttachmentLink}
                      ></PostCard>
                    </div>
                  );
                }

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
          {loading ? (
            <div className="search-loading center">
              <ReactLoading
                type="balls"
                className="mt-3"
                color="gray"
                height={"5%"}
                width={"5%"}
              ></ReactLoading>
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
