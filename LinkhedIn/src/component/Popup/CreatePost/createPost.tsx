import React, { createRef, useEffect, useState } from "react";
import "./createPost.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useMutation } from "@apollo/client";
import { CREATE_POST_QUERY } from "../../../query/post";
import { useUserAuth } from "../../../hooks/userContext";
import { useLoading } from "../../../hooks/loadingContext";
import { toastError, toastSuccess } from "../../../config/toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { uuidv4 } from "@firebase/util";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

import Input from "./input/input";
import { filteringAtMention, findHashtags } from "../../../script/helper";
import { useNavigate } from "react-router-dom";
import ShowOnHome from "./showOnHome/showOnHome";

export default function CreatePost(props: any) {
  const setHandle = props.setHandle;
  const { user } = useUserAuth();
  const { setLoading } = useLoading();
  const [value, setValue] = useState<any>("");
  const [createFunc, { loading }] = useMutation(CREATE_POST_QUERY);

  const [showHome, setShow] = useState<boolean>(false);
  const imgRef = createRef<HTMLInputElement>();
  const [img, setImg]: any = useState();
  const [type, setType]: any = useState();

  function addHashtag() {
    setValue((prev: any) => prev + "#");
  }

  function handleRemoveImage() {
    setImg(null);
    setType("");
  }

  function show() {
    setShow((prev) => !prev);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (value == "" || !value) {
      toastError("You cannot create a empty post!");
      return;
    }

    // Find Hashtag
    let hashtag = findHashtags(value);
    // Filtering Duplicates (Select Distinct)
    hashtag = [...new Set(hashtag)];

    const newValue = filteringAtMention(value);
    setLoading(true);

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
              variables: {
                userId: user.id,
                text: value,
                attachment: url,
                attachment_type: type,
                hashtag: hashtag,
              },
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
        variables: {
          userId: user.id,
          text: newValue,
          attachment: "",
          hashtag: hashtag,
          attachment_type: "",
        },
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
    const type = img.type;
    if (type.includes("image")) {
      setType("image");
    } else {
      setType("video");
    }

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
        <div className="center">
          <div className="border"></div>
        </div>
        <div className="input-post">
          {showHome ? <ShowOnHome>{filteringAtMention(value)}</ShowOnHome> : ""}

          <Input value={value} setValue={setValue}></Input>
        </div>
        <div className="flex flex-col">
          {img && type === "image" ? (
            <>
              <div className="center">
                <div className="image-container">
                  <div onClick={handleRemoveImage} className="x color-fg">
                    <FaTimes></FaTimes>
                  </div>
                  <img src={img} className="img-preview" alt="Preview Image" />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {img && type === "video" ? (
            <>
              <div className="center">
                <div className="image-container">
                  <div onClick={handleRemoveImage} className="x color-fg">
                    <FaTimes></FaTimes>
                  </div>
                  <video src={img} className="img-preview" controls />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="hashtag">
            <div className="flex">
              <p onClick={addHashtag} className="color-first">
                Add Hashtag
              </p>
              <p onClick={show} className="ml-4 color-first">
                Show
              </p>
            </div>
          </div>
          <div className="bottom">
            <label htmlFor="file-input" className="file-input">
              <div className="center">
                <FaCloudUploadAlt className="svg"></FaCloudUploadAlt>
              </div>
            </label>
            <input
              ref={imgRef}
              id="file-input"
              type="file"
              name="media"
              accept="image/*, video/*"
              onChange={handleImageOnChange}
            />

            <div className="flex">
              <button type="submit" className="post-btn">
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
