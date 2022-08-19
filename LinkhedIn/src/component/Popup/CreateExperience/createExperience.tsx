import { useMutation } from "@apollo/client";
import React from "react";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import { toastError, toastSuccess } from "../../../config/toast";
import { CREATE_EXPERIENCE_QUERY } from "../../../query/experience";
import "./createExperience.scss";

export default function CreateExperience(props: any) {
  const refetch = props.refetch;
  const id = props.id;
  const setHandle = props.setHandle;

  const [createFunc] = useMutation(CREATE_EXPERIENCE_QUERY);

  function closeHandle() {
    setHandle(false);
  }
  function handleSubmit(e: any) {
    e.preventDefault();

    const type = e.target.type.value;
    const company = e.target.company.value;
    const location = e.target.location.value;
    const start = e.target.start.value;
    const end = e.target.end.value;
    const industry = e.target.industry.value;
    const headline = e.target.headline.value;
    const active = e.target.activeorno.value;
    const title = e.target.title.value;

    const input = {
      UserID: id,
      Title: title,
      EmploymentType: type,
      CompanyName: company,
      Location: location,
      IsActive: active,
      StartYear: start,
      EndYear: end,
      Industry: industry,
      Headline: headline,
    };

    createFunc({
      variables: {
        input: input,
      },
    })
      .then((resp) => {
        toastSuccess("Succesfully create new experience");
        setHandle(false);
        refetch();
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  return (
    <>
      <div className="popup"></div>
      <form
        onSubmit={handleSubmit}
        className="popup-container create-experience"
      >
        <div className="flex">
          <h2>Experience</h2>
          <div className="center">
            <FaTimes onClick={closeHandle} className="icon"></FaTimes>
          </div>
        </div>
        <p className="mb-2">Create a Experience Here!</p>
        <p className="mt-5 create-experience-label mt-2">Emploment Type</p>
        <input
          placeholder="Worker"
          className="full-95 input-border mt-1"
          type="text"
          name="type"
        />
        <p className="create-experience-label mt-2">Company Name</p>
        <input
          placeholder="Binus University"
          className="full-95 input-border mt-1"
          type="text"
          name="company"
        />
        <p className="create-experience-label mt-2">Title</p>
        <input
          placeholder="Binus University"
          className="full-95 input-border mt-1"
          type="text"
          name="title"
        />
        <p className="create-experience-label mt-2">Location</p>
        <input
          placeholder="DKI Jakarta..."
          className="full-95 input-border mt-1"
          type="text"
          name="location"
        />
        <p className="create-experience-label mt-2">Start Year</p>
        <input
          placeholder="2003"
          className="full-95 input-border mt-1"
          type="text"
          name="start"
        />
        <p className="create-experience-label mt-2">End Year</p>
        <input
          placeholder="2020"
          className="full-95 input-border mt-1"
          type="text"
          name="end"
        />
        <p className="create-experience-label mt-2">Industry</p>
        <input
          placeholder="Education"
          className="full-95 input-border mt-1"
          type="text"
          name="industry"
        />
        <p className="create-experience-label mt-2">Headline</p>
        <input
          placeholder="Im The Best ..."
          className="full-95 input-border mt-1"
          type="text"
          name="headline"
        />
        <div className="activeorno">
            <input type="radio" id="html" name="activeorno" value="Yes" /> {" "}
          <label htmlFor="html">Active</label>
            <input type="radio" id="css" name="activeorno" value="No" />   {" "}
          <label htmlFor="javascript">Not Active</label>
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
