import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FIND_POST_QUERY } from "../../query/post";
import PostCard from "../home/post-card/post-card";
import "./post.scss";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery(FIND_POST_QUERY, { variables: { id: id } });
  if (!data) {
    return (
      <div className="post-container h-min-max">
        <div className="center">
          <h1>Not Found</h1>
          <button
            onClick={() => {
              navigate("/home");
            }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="post-container h-min-max">
      <PostCard data={data.post} text={data.post.text}></PostCard>
    </div>
  );
}
