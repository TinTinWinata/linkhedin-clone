import { useMutation } from "@apollo/client";
import React, { createRef, useEffect, useState } from "react";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import Select from "react-select";
import { toastError, toastSuccess } from "../../../config/toast";
import { UPDATE_EXPERIENCE_QUERY } from "../../../query/experience";
import "../CreateExperience/createExperience.scss";

export default function UpdateExperience(props: any) {
  const refetch = props.refetch;
  const id = props.id;
  const setHandle = props.setHandle;
  const data = props.data;
  const [option, setOption] = useState();

  const [createFunc] = useMutation(UPDATE_EXPERIENCE_QUERY);
  const [currData, setCurrData] = useState({
    ID: "",
    UserID: "",
    Title: "",
    EmploymentType: "",
    CompanyName: "",
    Location: "",
    IsActive: "",
    StartYear: "",
    EndYear: "",
    Industry: "",
    Headline: "",
  });

  useEffect(() => {
    setOption(
      data.map((data: any) => {
        return {
          value: data.ID,
          label: data.Title,
        };
      })
    );
    console.log(option);
  }, []);

  function selectOnChange(e: any) {
    const id = e.value;
    data.forEach((data: any) => {
      if (data.ID == id) {
        setCurrData(data);
      }
    });
  }

  function closeHandle() {
    setHandle(false);
  }
  function handleSubmit(e: any) {
    e.preventDefault();

    if (currData.ID == "") {
      toastError("You can't update a empty data");
      return;
    }

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
        id: currData.ID,
        input: input,
      },
    })
      .then((resp) => {
        toastSuccess("Succesfully update experience");
        setHandle(false);
        refetch();
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  function isDisabled(): boolean {
    if (currData.ID === "") {
      return true;
    } else {
      return false;
    }
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
        <p className="mb-2">Update a Experience Here!</p>

        <p className="mt-5 create-experience-label mt-2">Emploment Type</p>
        <Select onChange={selectOnChange} options={option}></Select>
        <p className="create-experience-label mt-2">Emploment Type</p>
        <input
          placeholder="Worker"
          className="full-95 input-border mt-1"
          type="text"
          name="type"
          defaultValue={currData.EmploymentType}
        />
        <p className="create-experience-label mt-2">Company Name</p>
        <input
          placeholder="Binus University"
          className="full-95 input-border mt-1"
          type="text"
          name="company"
          defaultValue={currData.CompanyName}
        />
        <p className="create-experience-label mt-2">Title</p>
        <input
          placeholder="Binus University"
          className="full-95 input-border mt-1"
          type="text"
          name="title"
          defaultValue={currData.Title}
        />
        <p className="create-experience-label mt-2">Location</p>
        <input
          placeholder="DKI Jakarta..."
          className="full-95 input-border mt-1"
          type="text"
          name="location"
          defaultValue={currData.Location}
        />
        <p className="create-experience-label mt-2">Start Year</p>
        <input
          placeholder="2003"
          className="full-95 input-border mt-1"
          type="text"
          name="start"
          defaultValue={currData.StartYear}
        />
        <p className="create-experience-label mt-2">End Year</p>
        <input
          placeholder="2020"
          className="full-95 input-border mt-1"
          type="text"
          name="end"
          defaultValue={currData.EndYear}
        />
        <p className="create-experience-label mt-2">Industry</p>
        <input
          placeholder="Education"
          className="full-95 input-border mt-1"
          type="text"
          name="industry"
          defaultValue={currData.Industry}
        />
        <p className="create-experience-label mt-2">Headline</p>
        <input
          placeholder="Im The Best ..."
          className="full-95 input-border mt-1"
          type="text"
          name="headline"
          defaultValue={currData.Headline}
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
