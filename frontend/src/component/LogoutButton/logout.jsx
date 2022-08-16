import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/userContext";

export default function LogoutButton({ children }) {
  const { update } = useUserAuth();
  const navigate = useNavigate();

  function handleLogout() {
    update(null);
    navigate("/login");
  }

  return (
    <div>
      <button onClick={handleLogout}>{children}</button>
    </div>
  );
}
