import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/userContext";

export default function LogoutButton({ children }: { children: any }) {
  const { update } = useUserAuth();
  const navigate = useNavigate();

  function handleLogout() {
    update(null);
    navigate("/login");
  }

  return (
    <div>
      <button className="logout-btn" onClick={handleLogout}>
        {children}
      </button>
    </div>
  );
}
