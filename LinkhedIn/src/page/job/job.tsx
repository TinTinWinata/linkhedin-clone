import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FIND_JOB_QUERY } from "../../query/job";
import "./job.scss";

export default function Job() {
  const { data } = useQuery(FIND_JOB_QUERY);
  const navigate = useNavigate();

  function handleCreate() {
    navigate("/create-job");
  }

  if (!data) {
    return <></>;
  }

  return (
    <div className="center-x h-min-max">
      <div className="job-container shadow">
        <div className="flex job-header-text">
          <h2 className="mb-3 color-first jobs-offer">Jobs Offer</h2>
          <button onClick={handleCreate} id="create-job-btn">
            Create Job
          </button>
        </div>
        <div className="create-job"></div>
        {data.jobs.map((job: any) => {
          return (
            <div key={job.id} className="job-card flex">
              <img src="https://picsum.photos/seed/picsum/200/300" alt="" />
              <div className="ml-3 flex flex-col">
                <p className="color-second title">{job.title}</p>
                <div className="flex">
                  <p className="company-name">{job.companyName}</p>
                  <p className="ml-1 location color-invic">{job.location}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
