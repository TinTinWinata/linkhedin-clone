import { useMutation } from "@apollo/client";
import React from "react";
import { toastError, toastSuccess } from "../../../../config/toast";
import { CREATE_COMMENT_QUERY } from "../../../../query/comment";

export default function CreateComment(props: any) {
  const user = props.user;
  const post = props.post;
  const refetch = props.refetch;
  const postRefetch = props.postRefetch;

  const [createFunc] = useMutation(CREATE_COMMENT_QUERY);

  function handleOnSubmit(e: any) {
    e.preventDefault();
    const value = e.target.comment.value;

    createFunc({
      variables: {
        userId: user.id,
        text: value,
        postId: post.id,
      },
    })
      .then((resp) => {
        refetch();
        postRefetch();
        e.target.comment.value = "";
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  return (
    <form onSubmit={handleOnSubmit} className="flex my-comment">
      <img src={user.PhotoProfile} alt="" />
      <input
        type="text"
        name="comment"
        className="input-border"
        placeholder="Add a comment..."
      />
    </form>
  );
}
