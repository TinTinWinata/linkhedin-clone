import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../hooks/userContext";
import LogoutButton from "../../LogoutButton/logout";

export default function Profile(props: any) {
  const link = props.link;
  const icon = props.icon;
  const text = props.text;
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [isHover, setHover] = useState<boolean>(false);

  function handleClick() {
    navigate("/profile/" + user.id);
  }

  return (
    <div
      className="menu relative"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className="center">
        <div className="contain">
          <div className="center">
            <img src={user.PhotoProfile} className="svg image" alt="" />
          </div>
          <div className="text">{text}</div>
        </div>
      </div>

      {isHover ? (
        <div className="profile-hover bg-color-bg shadow">
          <div className="flex">
            <img src={user.PhotoProfile} alt="" />
            <div className="header ml-2 mt-1">
              <b>{user.name}</b>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="center">
            <div className="border mt-3 mb-2"></div>
          </div>
          <div className="nav-profile">
            <h3>Account</h3>
            <p className="color-invic">Setting</p>
          </div>
          <div className="center">
            <div className="border mt-3 mb-2"></div>
          </div>
          <LogoutButton>Logout</LogoutButton>
          <div onClick={handleClick} className="second-button">
            View Profile
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
