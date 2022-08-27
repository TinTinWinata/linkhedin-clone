import { useMutation } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../config/toast";
import { CREATE_JOB_QUERY } from "../../query/job";
import "./create-job.scss";

export default function CreateJob() {
  const [createFunc] = useMutation(CREATE_JOB_QUERY);
  const navigate = useNavigate();

  function handleBack() {
    navigate("/job");
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const title = e.target.title.value;
    const companyName = e.target.companyName.value;
    const location = e.target.location.value;
    createFunc({
      variables: {
        title: title,
        companyName: companyName,
        location: location,
        photoProfile: "",
      },
    })
      .then((resp) => {
        toastSuccess("Succesfully to create job!");
        navigate("/job");
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  return (
    <div className="center">
      <div className="create-job-container">
        <div className="flex flex-col">
          <form onSubmit={handleSubmit} className="box" action="">
            <div className="flex flex-col">
              <h3>Create Job</h3>
              <label htmlFor="">Title</label>
              <input
                name="title"
                type="text"
                className="mt-1 create-job-input"
              />
              <label htmlFor="">Company Name</label>
              <input
                name="companyName"
                type="text"
                className="mt-1 create-job-input"
              />
              <label htmlFor="">Location</label>
              <input
                name="location"
                type="text"
                className="mt-1 create-job-input"
              />
              <button type="submit">Submit</button>
            </div>
          </form>
          <div className="center">
            <p onClick={handleBack} className="back color-first">
              Back to Job
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
