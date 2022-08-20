import React from "react";
import { useNavigate } from "react-router-dom";

export function CreateRoom(props: any) {
  const navigate = useNavigate();
  const create = async (e: any) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:8080/server/create");
    const { room_id } = await resp.json();

    navigate("/room/" + room_id);
  };

  return (
    <div>
      <button onClick={create}>Create Room</button>
    </div>
  );
}
