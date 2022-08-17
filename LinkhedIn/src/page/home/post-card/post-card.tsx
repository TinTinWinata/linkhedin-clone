import React from "react";
import "./css-post-card.scss";

export default function PostCard(props: any) {
  const img = props.link;
  return (
    <div className="post-card-margin">
      <div className="post-card">
        {img ? <img src={img} alt="" /> : ""}

        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: props.text }}
        ></div>
      </div>
    </div>
  );
}
