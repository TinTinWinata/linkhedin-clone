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

const firestore = db;

// Initialize WebRTC
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

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
        <Videos mode={currentPage} callId={joinCode} setPage={setCurrentPage} />
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

function Videos({
  mode,
  callId,
  setPage,
}: {
  mode: any;
  callId: any;
  setPage: any;
}) {
  const [webcamActive, setWebcamActive] = useState(false);
  const [roomId, setRoomId] = useState(callId);

  const localRef = useRef<any>();
  const remoteRef = useRef<any>();

  const setupSources = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);

    if (mode === "create") {
      const callDoc = await doc(collection(db, "calls"));
      console.log("calldoc : ", callDoc.id);
      const offerCandidates = await collection(
        db,
        `calls/${callDoc.id}/offerCandidates`
      );

      const answerCandidates = await collection(
        db,
        `calls/${callDoc.id}/offerCandidates`
      );

      setRoomId(callDoc.id);

      pc.onicecandidate = (event) => {
        // event.candidate && offerCandidates.add(event.candidate.toJSON());
        event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      // await callDoc.set({ offer });
      await setDoc(callDoc, { offer });
      onSnapshot(callDoc, (snapshot: any) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          console.log("data : ", data.answer);
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      onSnapshot(answerCandidates, (snapshot: any) => {
        snapshot.docChanges().forEach((change: any) => {
          if (change.type === "added") {
            const data = change.doc.data();
            console.log("answer candidaet : ", data);
            if (data) {
              const candidate = new RTCIceCandidate(data);
              pc.addIceCandidate(candidate);
            }
          }
        });
      });
    } else if (mode === "join") {
      // const callDoc = firestore.collection("calls").doc(callId);
      const callDoc = doc(db, "calls", callId);
      // const offerCandidates = callDoc.collection("offerCandidates");
      const answerCandidates = collection(
        db,
        "calls",
        callId,
        "answerCandidates"
      );
      const offerCandidates = collection(
        db,
        "calls",
        callId,
        "offerCandidates"
      );

      pc.onicecandidate = (event) => {
        // event.candidate && answerCandidates.add(event.candidate.toJSON());
        event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
      };

      // const callData = (await callDoc.get()).data();
      const callData = (await getDoc(callDoc)).data();

      if (callData?.offer) {
        const offerDescription = callData?.offer;
        await pc.setRemoteDescription(
          new RTCSessionDescription(offerDescription)
        );
      }

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await updateDoc(callDoc, { answer });

      onSnapshot(offerCandidates, (snapshot: any) => {
        snapshot.docChanges().forEach((change: any) => {
          if (change.type === "added") {
            let data = change.doc.data();
            console.log("offer : ", data);
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }

    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        hangUp();
      }
    };
  };

  const hangUp = async () => {
    pc.close();

    if (roomId) {
      // let roomRef = firestore.collection("calls").doc(roomId);
      let roomRef = doc(db, "calls", roomId);

      let answerCandidateRef = collection(
        db,
        "calls",
        roomId,
        "answerCandidates"
      );
      let offerCandidatesRef = collection(
        db,
        "calls",
        roomId,
        "offerCandidates"
      );

      getDocs(answerCandidateRef).then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          doc.ref.delete();
        });
      });

      getDocs(offerCandidatesRef).then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          doc.ref.delete();
        });
      });

      // await roomRef
      //   .collection("answerCandidates")
      //   .get()
      //   .then((querySnapshot: any) => {
      //     querySnapshot.forEach((doc: any) => {
      //       doc.ref.delete();
      //     });
      //   });
      // await roomRef
      //   .collection("offerCandidates")
      //   .get()
      //   .then((querySnapshot: any) => {
      //     querySnapshot.forEach((doc: any) => {
      //       doc.ref.delete();
      //     });
      //   });

      // await roomRef.delete();
    }

    window.location.reload();
  };

  return (
    <div className="videos">
      <video ref={localRef} autoPlay playsInline className="local" muted />
      <video ref={remoteRef} autoPlay playsInline className="remote" />

      <div className="buttonsContainer">
        <button
          onClick={hangUp}
          disabled={!webcamActive}
          className="hangup button"
        >
          <FaPhone />
        </button>
        <div tabIndex={0} role="button" className="more button">
          <FaEllipsisV />
          <div className="popover">
            <button
              onClick={() => {
                navigator.clipboard.writeText(roomId);
              }}
            >
              <FaCopy /> Copy joining code
            </button>
          </div>
        </div>
      </div>

      {!webcamActive && (
        <div className="modalContainer">
          <div className="modal">
            <h3>Turn on your camera and microphone and start the call</h3>
            <div className="container">
              <button onClick={() => setPage("home")} className="secondary">
                Cancel
              </button>
              <button onClick={setupSources}>Start</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
