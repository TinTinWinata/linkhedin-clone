import React from "react";
import "./waiting.scss";

export default function Waiting({ time }: { time: any }) {
  const date = time.toDate();
  return (
    <div className="waiting-container">
      <div className="text">
        <h2>The room isn't ready yet!</h2>
        <h2>{date.toString()}</h2>
      </div>
    </div>
  );
}
