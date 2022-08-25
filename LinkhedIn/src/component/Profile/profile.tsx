import React from "react";
import { useUserAuth } from "../../hooks/userContext";
import "./profile.scss";

export default function ProfileComponent() {
  const { user } = useUserAuth();
  return (
    <div
      style={{ backgroundImage: `${user.BgPhotoProfile}` }}
      className="profile-component box"
    >
      <div className="padding">
        {/* BgPhotoProfile */}
        <div className="bg"></div>
        <div className="center">
          <img src={user.PhotoProfile} alt="" />
        </div>
        <div className="desc">
          <b>{user.name}</b>
          <p className="color-invic headline">{user.email}</p>
          <p className="color-invic headline">{user.Headline}</p>
        </div>
      </div>
    </div>
  );
}
