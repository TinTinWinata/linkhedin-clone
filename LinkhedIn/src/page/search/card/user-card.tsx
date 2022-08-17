import React from "react";
import { useNavigate } from "react-router-dom";
import "./card.scss";

export default function UserCard(props: any) {
  const user = props.user;
  const navigate = useNavigate();

  function handleClick() {
    navigate("/profile/" + user.id);
  }

  return (
    <div className="user-card" onClick={handleClick}>
      <div className="flex">
        <img src="https://picsum.photos/seed/picsum/300/300" alt="" />
        <div className="text">
          <p>{user.name}</p>
        </div>
      </div>
    </div>
  );
}
