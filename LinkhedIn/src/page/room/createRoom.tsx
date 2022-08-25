import { useRef, useState } from "react";

import * as firebase from "firebase/app";
import "firebase/firestore";

// import { ReactComponent as HangupIcon } from "./icons/hangup.svg";
// import { ReactComponent as MoreIcon } from "./icons/more-vertical.svg";
// import { ReactComponent as CopyIcon } from "./icons/copy.svg";

import "./room.scss";
import { FaCopy, FaEllipsisV, FaPhone } from "react-icons/fa";
import { db } from "../../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Room } from "./room";

const firestore = db;

export default function CreateRoom() {
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  return (
    <div className="room">
      {currentPage === "home" ? (
        <Menu
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          setPage={setCurrentPage}
        />
      ) : (
        <Room mode={currentPage} callId={joinCode} />
      )}
    </div>
  );
}

function Menu({
  joinCode,
  setJoinCode,
  setPage,
}: {
  joinCode: any;
  setJoinCode: any;
  setPage: any;
}) {
  return (
    <div className="room">
      <div className="create box">
        <button onClick={() => setPage("create")}>Create Call</button>
      </div>

      <div className="answer box">
        <input
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Join with code"
        />
        <button onClick={() => setPage("join")}>Answer</button>
      </div>
    </div>
  );
}
