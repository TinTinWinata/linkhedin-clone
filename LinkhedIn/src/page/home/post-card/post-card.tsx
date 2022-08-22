import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  FaComment,
  FaHeart,
  FaTelegramPlane,
  FaThumbsUp,
} from "react-icons/fa";
import Hashtag from "../../../component/Hashtag/hashtag";
import SendPost from "../../../component/Popup/SendPost/sendpost";
import { toastError, toastSuccess } from "../../../config/toast";
import { useUserAuth } from "../../../hooks/userContext";
import { FIND_POST_QUERY, LIKE_POST_QUERY } from "../../../query/post";
import Comment from "./comments/comment";
import CreateComment from "./create-comment/create-comment";
import "./css-post-card.scss";
import PostRichText from "./post-richtext/postRichText";

export default function PostCard(props: any) {
  const idx = props.idx;
  const [commentHandle, setCommentHandle] = useState(false);
  const [likeFunc] = useMutation(LIKE_POST_QUERY);

  const [popup, setPopup] = useState<boolean>(false);

  const { data, refetch } = useQuery(FIND_POST_QUERY, {
    variables: {
      id: props.data.id,
    },
  });

  function handleComment() {
    setCommentHandle((prev) => !prev);
  }
  function handleLike() {
    likeFunc({
      variables: {
        id: data.post.id,
      },
    })
      .then((resp) => {
        refetch().then((resp) => {
          console.log(resp);
        });
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  function handleClickSend() {
    setPopup(true);
  }

  if (!data) {
    return <></>;
  }

  return (
    <>
      {popup ? (
        <SendPost
          refetch={refetch}
          post={data.post}
          setHandle={setPopup}
        ></SendPost>
      ) : (
        ""
      )}

      <div className="post-card-margin">
        <div className="post-card">
          <div className="header">
            <img src={data.post.User.PhotoProfile} alt="" />
            <div className="header-desc">
              <p>{data.post.User.name}</p>
            </div>
          </div>
          {data.post && data.post.AttachmentLink !== "" ? (
            <img src={data.post.AttachmentLink} alt="" />
          ) : (
            ""
          )}
          <PostRichText index={idx}>{props.text}</PostRichText>

          {/* Hashtag */}
          <div className="flex ml-2">
            {data.post &&
              data.post.hashtag.map((hashtag: any, idx: any) => {
                return <Hashtag key={idx}>{hashtag}</Hashtag>;
              })}
          </div>

          <div className="center">
            <div className="color-invic post-extras width-90">
              <div className="flex">
                <p>{data.post.likes}</p>
                <div className="center">
                  <FaHeart className="love"></FaHeart>
                </div>
              </div>
              <div className="flex">
                <div className="flex">
                  <p>{data.post.comments} comments</p>
                  <p className="sends">{data.post.sends} shares</p>
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
            <div onClick={handleClickSend} className="post-icon flex">
              <div className="center">
                <FaTelegramPlane className="icon"></FaTelegramPlane>
              </div>
              <p>Send</p>
            </div>
          </div>
          {commentHandle ? (
            <Comment refetch={refetch} post={data.post}></Comment>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
