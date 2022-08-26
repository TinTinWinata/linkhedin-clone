import React from "react";
import Request from "./request/request";
import "./network.scss";

export default function Network() {
  return (
    <div className="network h-min-max">
      <div className="center">
        <Request></Request>
      </div>
    </div>
  );
}
