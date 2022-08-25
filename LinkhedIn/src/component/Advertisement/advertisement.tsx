import React from "react";
import { useNavigate } from "react-router-dom";
import "./advertisement.scss";

export default function Advertisement() {
  const navigate = useNavigate();
  return (
    <div className="advertisement">
      <a href="https://www.linkedin.com/jobs/?trk=li_FA_global_careers_jobsgtm_jsFA_v1&mcid=6899045044465016833">
        <img className="shadow" src="/ads.png" alt="" />
      </a>
    </div>
  );
}
