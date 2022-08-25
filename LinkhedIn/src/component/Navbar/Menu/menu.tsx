import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Menu(props: any) {
  const link = props.link;
  const icon = props.icon;
  const text = props.text;

  const handleActivePage = (state: any) => {
    if (state.isActive) {
      return "menu nav-border";
    } else {
      return "menu";
    }
  };

  return (
    <NavLink to={link} className={handleActivePage}>
      <div className="center">
        <div className="contain">
          <div className="center">{icon}</div>
          <div className="text">{text}</div>
        </div>
      </div>
    </NavLink>
  );
}
