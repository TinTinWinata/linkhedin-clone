import React from "react";
import {
  FaBookOpen,
  FaHome,
  FaNetworkWired,
  FaSearch,
  FaSnapchat,
  FaTelegram,
} from "react-icons/fa";
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
    <div className="navbar shadow">
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
            <div className="flex search-bar">
              <div className="center ">
                <FaSearch></FaSearch>
              </div>
              <input type="text" name="search" placeholder="Search" />
            </div>
          </form>
        </div>
        <div className="right">
          <Menu
            text="Home"
            link="/home"
            icon={<FaHome className="svg" />}
          ></Menu>
          <Menu
            text="Network"
            link="/network"
            icon={<FaNetworkWired className="svg" />}
          ></Menu>
          <Menu
            text="Job"
            link="/job"
            icon={<FaBookOpen className="svg"></FaBookOpen>}
          ></Menu>
          <Menu
            text="Notification"
            link="/notification"
            icon={<FaSnapchat className="svg"></FaSnapchat>}
          ></Menu>
          <Menu
            text="Message"
            link="/message"
            icon={<FaTelegram className="svg"></FaTelegram>}
          ></Menu>
          <Profile text="Me" link={"/profile/" + user.id} icon=""></Profile>
        </div>
      </div>
    </div>
  );
}
