import React, { useEffect, useState } from "react";
import "./createPost.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@apollo/client";
import { CREATE_POST_QUERY } from "../../../query/post";
import { useUserAuth } from "../../../hooks/userContext";
import { useLoading } from "../../../hooks/loadingContext";
import { toastError, toastSuccess } from "../../../config/toast";

export default function CreatePost(props: any) {
  const setHandle = props.setHandle;
  const { user } = useUserAuth();
  const { setLoading } = useLoading();
  const [value, setValue] = useState("");
  const [createFunc, { loading }] = useMutation(CREATE_POST_QUERY);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (value == "") {
      toastError("You cannot create a empty post!");
      return;
    }

    createFunc({ variables: { userId: user.id, text: value } })
      .then((resp) => {
        toastSuccess("Sucessfully created a post!");
        setLoading(false);
        setHandle(false);
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  useEffect(() => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="create-post">
      <div className="popup"></div>
      <form onSubmit={handleSubmit} className="popup-container">
        <svg
          onClick={() => {
            setHandle(false);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="x-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h3>Create Post</h3>
        <div className="border"></div>
        <ReactQuill
          className="quill"
          theme="snow"
          value={value}
          onChange={setValue}
        />
        <button type="submit" className="post-btn">
          Post
        </button>
      </form>
    </div>
  );
}
