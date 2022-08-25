import React from "react";
import { useUserAuth } from "../../../../hooks/userContext";
import PostRichText from "../../../../page/home/post-card/post-richtext/postRichText";
import "./showOnHome.scss";

export default function ShowOnHome({ children }: { children: any }) {
  const { user } = useUserAuth();

  return (
    <div className="show-on-home-container box">
      <div className="flex mb-2">
        <div className="center">
          <img src={user.PhotoProfile} alt="" />
        </div>
        <div className="center">
          <p>{user.name}</p>
        </div>
      </div>
      <div className="border mb-2"></div>
      <PostRichText index={99}>{children}</PostRichText>
    </div>
  );
}
