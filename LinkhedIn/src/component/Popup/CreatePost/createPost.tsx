import React, { createRef, useEffect, useState } from "react";
import "./createPost.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@apollo/client";
import { CREATE_POST_QUERY } from "../../../query/post";
import { useUserAuth } from "../../../hooks/userContext";
import { useLoading } from "../../../hooks/loadingContext";
import { toastError, toastSuccess } from "../../../config/toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { uuidv4 } from "@firebase/util";

export default function CreatePost(props: any) {
  const setHandle = props.setHandle;
  const { user } = useUserAuth();
  const { setLoading } = useLoading();
  const [value, setValue] = useState<any>();
  const [createFunc, { loading }] = useMutation(CREATE_POST_QUERY);

  const imgRef = createRef<HTMLInputElement>();
  const [img, setImg]: any = useState();

  function handleSubmit(e: any) {
    e.preventDefault();

    setLoading(true);
    if (value == "") {
      toastError("You cannot create a empty post!");
      return;
    }

    let img = null;
    if (imgRef?.current?.files?.length == 1) {
      img = imgRef?.current?.files[0];
    }
    if (img) {
      const imageRef = ref(storage, `images/${img?.name}-${uuidv4()}`);
      uploadBytes(imageRef, img)
        .then((resp) => {
          getDownloadURL(imageRef).then((url) => {
            createFunc({
              variables: { userId: user.id, text: value, attachment: url },
            })
              .then((resp) => {
                toastSuccess("Sucessfully created a post!");
                setLoading(false);
                setHandle(false);
              })
              .catch((err) => {
                toastError(err.message);
                setLoading(false);
              });
          });
        })
        .catch((err) => {
          toastError(err.message);
          setLoading(false);
        });
    } else {
      createFunc({
        variables: { userId: user.id, text: value, attachment: "" },
      })
        .then((resp) => {
          toastSuccess("Sucessfully created a post!");
          setLoading(false);
          setHandle(false);
        })
        .catch((err) => {
          toastError(err.message);
          setLoading(false);
        });
    }
  }

  function handleImageOnChange(e: any) {
    let img = null;
    if (imgRef?.current?.files?.length == 1) {
      img = imgRef?.current?.files[0];
    }
    if (img === null) return;
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      setImg(reader.result);
    };
  }

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
        <div className="flex flex-col">
          {img ? (
            <img src={img} className="img-preview" alt="Preview Image" />
          ) : (
            ""
          )}

          <div className="bottom">
            <label htmlFor="file-input">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </label>
            <input
              ref={imgRef}
              id="file-input"
              type="file"
              name="media"
              accept="image/*, video/*"
              onChange={handleImageOnChange}
            />
            <button type="submit" className="post-btn">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
