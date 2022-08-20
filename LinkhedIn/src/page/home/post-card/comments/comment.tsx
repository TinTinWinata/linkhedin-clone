import { useQuery } from "@apollo/client";
import React from "react";
import { useUserAuth } from "../../../../hooks/userContext";
import { SEE_COMMENT_QUERY } from "../../../../query/comment";
import CreateComment from "../create-comment/create-comment";
import "../css-post-card.scss";

export default function Comment(props: any) {
  const postRefetch = props.refetch;
  const post = props.post;
  const { user } = useUserAuth();
  const { data, refetch } = useQuery(SEE_COMMENT_QUERY, {
    variables: {
      postId: post.id,
    },
  });

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
          data.seeCommentOnPost.map((comment: any) => {
            console.log(comment);
            return (
              <div key={comment.ID}>
                <div className="flex user-comment">
                  <img src={comment.User.PhotoProfile} alt="" />
                  <div className="center" id="comment-text">
                    <div className="flex flex-col">
                      <p>{comment.User.name}</p>
                      <p id="comment-value">{comment.Text}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
