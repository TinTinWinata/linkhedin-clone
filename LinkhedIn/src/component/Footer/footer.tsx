import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/themeContext";
import "./footer.scss";

export default function Footer() {
  const { isDark } = useTheme();
  return (
    <div className="bg-color-bg footer">
      {/* Logo */}
      <div className="flex">
        <div className="center">
          <div className="border"></div>
        </div>
        <img src={isDark() ? "/logo_secondary.png" : "/logo.png"} alt="" />
        <div className="center">
          <div className="border"></div>
        </div>
      </div>
      <div className="center copyright color-invic">
        LinkedIn Corporation © 2022
      </div>
      <div className="center">
        <div className="link">
          <Link className="color-first" to="/home">
            Home
          </Link>
          <Link className="color-first" to="/network">
            Network
          </Link>
          <Link className="color-first" to="/message">
            Message
          </Link>
          <Link className="color-first" to="/notification">
            Notification
          </Link>
          <Link className="color-first" to="/job">
            Job
          </Link>
        </div>
      </div>
    </div>
  );
}
