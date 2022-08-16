import React from "react";
import ReactLoading from "react-loading";
import "./loading.scss";

export function Loading() {
  return (
    <React.Fragment>
      <div className="loading-all fixed w-screen h-screen bg-black opacity-50"></div>
      <ReactLoading
        className="loading-react-loading"
        type="bars"
        color="white"
        height={"10%"}
        width={"10%"}
      ></ReactLoading>
    </React.Fragment>
  );
}
