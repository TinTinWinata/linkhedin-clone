import React from "react";
import ProfileComponent from "../../../component/Profile/profile";
import "./left.scss";

export default function Left() {
  return (
    <div className="home-left">
      <div className="flex-this">
        <ProfileComponent></ProfileComponent>
      </div>
    </div>
  );
}
