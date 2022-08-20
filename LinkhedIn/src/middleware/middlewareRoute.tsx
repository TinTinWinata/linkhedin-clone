import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../component/Footer/footer";
import Navbar from "../component/Navbar/navbar";
import { useUserAuth } from "../hooks/userContext";
import CreateJob from "../page/create-job/createJob";
import Home from "../page/home/home";
import Job from "../page/job/job";
import Message from "../page/message/message";
import Network from "../page/network/network";
import Notification from "../page/notification/notification";
import Profile from "../page/profile/profile";
import { CreateRoom } from "../page/room/createRoom";
import Room from "../page/room/room";
import Search from "../page/search/search";

export default function MiddlewareRoutes() {
  const { getUser } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (getUser) {
      const user = getUser();
      if (
        user === undefined ||
        user === null ||
        user === false ||
        Object.keys(user).length == 0
      ) {
        navigate("/login");
      }
    }
  }, [getUser]);

  return (
    <>
      <Navbar></Navbar>
      {/* <div className="inside-bg">
        <div className="inside-container"> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/network" element={<Network />}></Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/search/:query" element={<Search />}></Route>
        <Route path="/job" element={<Job />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route path="/create-job" element={<CreateJob />}></Route>
        <Route path="/room/:id" element={<Room />}></Route>
        <Route path="/create-room" element={<CreateRoom />}></Route>
      </Routes>
      {/* </div>
      </div>
      <Footer></Footer> */}
    </>
  );
}
