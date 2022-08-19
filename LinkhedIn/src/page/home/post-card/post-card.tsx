import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  FaComment,
  FaHeart,
  FaTelegramPlane,
  FaThumbsUp,
} from "react-icons/fa";
import { toastError, toastSuccess } from "../../../config/toast";
import { useUserAuth } from "../../../hooks/userContext";
import { LIKE_POST_QUERY } from "../../../query/post";
import Comment from "./comments/comment";
import CreateComment from "./create-comment/create-comment";
import "./css-post-card.scss";

export default function PostCard(props: any) {
  const img = props.link;
  const data = props.data;
  const refetch = props.refetch;
  const [commentHandle, setCommentHandle] = useState(false);
  const [likeFunc] = useMutation(LIKE_POST_QUERY);

  function handleComment() {
    setCommentHandle((prev) => !prev);
  }
  function handleLike() {
    likeFunc({
      variables: {
        id: data.id,
      },
    })
      .then((resp) => {
        refetch();
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  return (
    <div className="post-card-margin">
      <div className="post-card">
        <div className="header">
          <img src={data.User.PhotoProfile} alt="" />
          <div className="header-desc">
            <p>{data.User.name}</p>
          </div>
        </div>
        {img && img !== "" ? <img src={img} alt="" /> : ""}
        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: props.text }}
        ></div>
        <div className="center">
          <div className="color-invic post-extras width-90">
            <div className="flex">
              <p>{data.likes}</p>
              <div className="center">
                <FaHeart className="love"></FaHeart>
              </div>
            </div>
            <div className="flex">
              <div className="flex">
                <p>{data.comments} comments</p>
                <p className="sends">{data.sends} shares</p>
              </div>
            </div>
          </div>
        </div>
        <div className="center">
          <div className="my-border"></div>
        </div>
        <div className="flex space-between post-width width-90">
          {/* Like */}
          <div className="post-icon flex" onClick={handleLike}>
            <div className="center">
              <FaThumbsUp className="icon"></FaThumbsUp>
            </div>
            <p>Like</p>
          </div>
          {/* Comment */}
          <div className="post-icon flex" onClick={handleComment}>
            <div className="center">
              <FaComment className="icon"></FaComment>
            </div>
            <p>Comment</p>
          </div>
          {/* Send */}
          <div className="post-icon flex">
            <div className="center">
              <FaTelegramPlane className="icon"></FaTelegramPlane>
            </div>
            <p>Send</p>
          </div>
        </div>
        {commentHandle ? <Comment post={data}></Comment> : ""}
      </div>
    </div>
  );
}
