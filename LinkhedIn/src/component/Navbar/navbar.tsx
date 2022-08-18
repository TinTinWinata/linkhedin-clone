import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/userContext";
import LogoutButton from "../LogoutButton/logout";
import Menu from "./Menu/menu";
import "./navbar.scss";
import Profile from "./Profile/profile";

export default function Navbar() {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  function onSearch(e: any) {
    e.preventDefault();
    const search = e.target.search.value;
    navigate("/search/" + search);
  }

  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <div className="center">
            <img
              onClick={() => {
                navigate("/home");
              }}
              src="/logo.png"
              alt="Logo"
            />
          </div>
          <form onSubmit={onSearch}>
            <input type="text" name="search" />
          </form>
        </div>
        <div className="right">
          <div className="center logout">
            <LogoutButton>Logout</LogoutButton>
          </div>
          <Menu text="Home" link="/home" icon="asd"></Menu>
          <Menu text="Network" link="/network" icon="asd"></Menu>
          <Menu text="Job" link="/job" icon="asd"></Menu>
          <Menu text="Notification" link="/notification" icon="asd"></Menu>
          <Menu text="Message" link="/message" icon="asd"></Menu>
          <Profile text="Me" link={"/profile/" + user.id} icon="asd"></Profile>
        </div>
      </div>
    </div>
  );
}
