import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useUserAuth } from "../hooks/userContext";
import Home from "../page/home/home";

export default function MiddlewareRoutes() {
  const { getUser } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (getUser) {
      const user = getUser();
      if (user === undefined || user === null || user === false) {
        navigate("/login");
      }
    }
  }, [getUser]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
}
