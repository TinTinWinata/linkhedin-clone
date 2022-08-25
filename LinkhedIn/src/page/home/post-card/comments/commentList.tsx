import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FaHeart, FaReply } from "react-icons/fa";
import { toastError } from "../../../../config/toast";
import { useUserAuth } from "../../../../hooks/userContext";
import {
  LIKE_COMMENT_QUERY,
  REPLY_COMMENT_QUERY,
} from "../../../../query/comment";
import PostRichText from "../post-richtext/postRichText";

export default function CommentList(props: any) {
  const comment = props.comment;
  const [showInput, setShowInput] = useState<boolean>(false);
  const [repliesFunc] = useMutation(REPLY_COMMENT_QUERY);
  const { user } = useUserAuth();

  const [likeFunc] = useMutation(LIKE_COMMENT_QUERY);

  function handleReply() {
    setShowInput((prev) => !prev);
  }

  function refetch() {
    props.setRefresh(true);
    props
      .refetch({ limit: props.offset, offset: 0 })
      .then((resp: any) => {})
      .catch((err: any) => {
        toastError(err.message);
      });
  }

  function handleOnSubmit(e: any) {
    e.preventDefault();
    const replies = e.target.replies.value;
    const input = {
      CommendId: comment.ID,
      Text: replies,
      UserId: user.id.toString(),
    };
    repliesFunc({
      variables: {
        input: input,
      },
    })
      .then(() => {
        setShowInput(false);
        refetch();
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  function handleLikeComment() {
    likeFunc({ variables: { commentId: comment.ID } })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  return (
    <div key={comment.ID}>
      <div className="flex">
        <div className="flex user-comment">
          <div className="flex flex-col">
            <img src={comment.User.PhotoProfile} alt="" />
            <div onClick={handleLikeComment} className="user-like flex center">
              <div className="center">
                <FaHeart className="icon-heart"></FaHeart>
              </div>
              <p className="likes-count">{comment.Likes}</p>
            </div>
          </div>

          <div className="center" id="comment-text">
            <div className="flex flex-col">
              <p>{comment.User.name}</p>
              {/* <PostRichText index={props.idx}>{comment.Text}</PostRichText> */}
              <p id="comment-value">{comment.Text}</p>
            </div>
          </div>
        </div>
        <div className="center">
          <FaReply onClick={handleReply} className="reply-icon"></FaReply>
          {showInput ? (
            <form
              onSubmit={handleOnSubmit}
              action=""
              className="flex submit-reply shadow"
            >
              <input type="text" className="ml-3 " name="replies" />
              <button className="ml-2" type="submit">
                Submit
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="comment-replies">
        {comment.Replies.map((reply: any) => {
          return (
            <div key={reply.ID} className="bg-color-bd the-comment-reply flex">
              <p>{reply.Text}</p>
              <p className="color-invic ml-1">{"@" + reply.User.name}</p>
              <div className="center">
                <img className="ml-1" src={reply.User.PhotoProfile} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
