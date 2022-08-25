import "./startPostButton.scss";
import React from "react";
import { useUserAuth } from "../../../hooks/userContext";
import {
  FaBookOpen,
  FaBorderNone,
  FaPhotoVideo,
  FaRegCalendarAlt,
  FaVideo,
} from "react-icons/fa";
// import { IconName } from "react-icons/fc";

export default function StartPostButton(props: any) {
  const handle = props.handle;
  const { user } = useUserAuth();

  function handleClick() {
    handle(true);
  }

  return (
    <div className="aborder-radius start-post-button box">
      <div className="padding">
        <div className="flex">
          <div className="center">
            <img src={user.PhotoProfile} alt="" />
          </div>
          <div onClick={handleClick} className="the-button">
            Start a Post
          </div>
        </div>
        <div className="flex space-between icon-container">
          <div className="icon flex">
            <div className="center">
              <FaPhotoVideo className="photo-icon the-icon"></FaPhotoVideo>
            </div>
            <p>Photo</p>
          </div>
          <div className="icon flex">
            <div className="center">
              <FaVideo className="video-icon the-icon" />
            </div>
            <p>Video</p>
          </div>
          <div className="icon flex">
            <div className="center">
              <FaRegCalendarAlt className="event-icon the-icon" />
            </div>
            <p>Event</p>
          </div>
          <div className="icon flex">
            <div className="center">
              <FaBorderNone className="article-icon the-icon" />
            </div>
            <p>Write Article</p>
          </div>
        </div>
      </div>
    </div>
  );
}
