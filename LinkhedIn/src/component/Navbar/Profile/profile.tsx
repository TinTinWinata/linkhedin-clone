import React from "react";
import { Link } from "react-router-dom";

export default function Profile(props: any) {
  const link = props.link;
  const icon = props.icon;
  const text = props.text;
  return (
    <div className="menu">
      <Link to={link}>
        <div className="center">
          <div className="contain">
            <div className="center">
              <img
                src="https://picsum.photos/id/237/200/300"
                className="svg image"
                alt=""
              />
            </div>
            <div className="text">{text}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
