import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";
import { useUserAuth } from "../../../../hooks/userContext";
import { SEE_COMMENT_QUERY } from "../../../../query/comment";
import {
  removeDuplicatesObjectID,
  removeDuplicatesObjectId,
} from "../../../../script/helper";
import CreateComment from "../create-comment/create-comment";
import "../css-post-card.scss";
import CommentList from "./commentList";

export default function Comment(props: any) {
  const postRefetch = props.refetch;
  const post = props.post;

  const limit = 3;
  const [offset, setOffset] = useState<any>(0);
  const { user } = useUserAuth();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [hasMore, setHasmore] = useState<boolean>(true);
  const [comments, setComments] = useState([]);
  const { data, refetch, loading } = useQuery(SEE_COMMENT_QUERY, {
    variables: {
      postId: post.id,
      limit: limit,
      offset: offset,
    },
  });

  useEffect(() => {
    if (data) {
      if (!refresh) {
        setComments((prev: any) => {
          const newArr = [...prev, ...data.seeCommentOnPost];
          const filteredArr = removeDuplicatesObjectID(newArr);
          return filteredArr;
        });
      } else {
        setComments(data.seeCommentOnPost);
      }
    }
  }, [data]);

  function loadMore() {
    if (!hasMore) return;

    refetch({
      postId: post.id,
      limit: limit,
      offset: offset + limit,
    }).then((resp) => {
      if (resp.data.seeCommentOnPost) {
        if (resp.data.seeCommentOnPost.length < limit) {
          setHasmore(false);
        }
      }
      setOffset((prev: any) => prev + limit);
    });
  }

  if (!comments || comments.length === 0) {
    return (
      <>
        <CreateComment
          postRefetch={postRefetch}
          refetch={refetch}
          post={post}
          user={user}
        ></CreateComment>
      </>
    );
  }

  return (
    <>
      <CreateComment
        postRefetch={postRefetch}
        refetch={refetch}
        post={post}
        user={user}
      ></CreateComment>

      <div className="comment-container">
        <p id="my-10 comment-text">Comments</p>
        {data &&
          comments.map((comment: any) => {
            return (
              <CommentList
                limit={limit}
                offset={offset}
                postRefetch={postRefetch}
                refetch={refetch}
                setRefresh={setRefresh}
                key={comment.ID}
                comment={comment}
              ></CommentList>
            );
          })}
        <div className="center">
          {hasMore ? (
            <p onClick={loadMore} className="load-more color-first mb-2">
              Load More
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
