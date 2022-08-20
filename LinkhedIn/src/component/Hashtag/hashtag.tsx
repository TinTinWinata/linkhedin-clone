import React from "react";
import { Link } from "react-router-dom";
import "./hashtag.scss";

export default function Hashtag({ children }: { children: any }) {
  const search = children.replace("#", "");
  return (
    <Link to={"/search/" + search} className="hashtag-component">
      {children}
    </Link>
  );
}
