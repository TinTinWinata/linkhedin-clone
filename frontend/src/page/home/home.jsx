import React from "react";
import { useEffect } from "react";
import LogoutButton from "../../component/LogoutButton/logout";
import { useUserAuth } from "../../hooks/userContext";

export default function Home() {
  const { user } = useUserAuth();

  return (
    <>
      {user ? user.name : ""}
      <div>home</div>
      <LogoutButton>Logout</LogoutButton>
    </>
  );
}
