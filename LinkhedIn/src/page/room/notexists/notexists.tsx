import React from "react";
import { useNavigate } from "react-router-dom";
import "./notexists.scss";

export default function NotExists() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/home");
  }

  return (
    <div className="waiting-container">
      <div className="text">
        <h2>The room isn't exists</h2>
        <div className="center">
          <button onClick={handleClick}>Back</button>
        </div>
      </div>
    </div>
  );
}
