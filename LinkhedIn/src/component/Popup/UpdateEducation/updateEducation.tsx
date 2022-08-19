import { useMutation } from "@apollo/client";
import React, { createRef, useEffect, useState } from "react";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import Select from "react-select";
import { toastError, toastSuccess } from "../../../config/toast";
import { UPDATE_EDUCATION_QUERY } from "../../../query/education";
import { UPDATE_EXPERIENCE_QUERY } from "../../../query/experience";
import "../CreateExperience/createExperience.scss";

export default function UpdateEducation(props: any) {
  const refetch = props.refetch;
  const id = props.id;
  const setHandle = props.setHandle;
  const data = props.data;
  const [option, setOption] = useState();

  const [createFunc] = useMutation(UPDATE_EDUCATION_QUERY);
  const [currData, setCurrData] = useState({
    ID: "",
    UserID: "",
    School: "",
    Degree: "",
    Field: "",
    Grade: "",
    Activities: "",
    Description: "",
    StartYear: "",
    EndYear: "",
  });

  useEffect(() => {
    setOption(
      data.map((data: any) => {
        return {
          value: data.ID,
          label: data.School,
        };
      })
    );
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

    const school = e.target.school.value;
    const degree = e.target.degree.value;
    const field = e.target.field.value;
    const grade = e.target.grade.value;
    const activities = e.target.activities.value;
    const desc = e.target.description.value;
    const start = e.target.start.value;
    const end = e.target.end.value;

    const input = {
      UserID: id,
      School: school,
      Degree: degree,
      Field: field,
      Grade: grade,
      Activities: activities,
      Description: desc,
      StartYear: start,
      EndYear: end,
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
          <h2>Education</h2>
          <div className="center">
            <FaTimes onClick={closeHandle} className="icon"></FaTimes>
          </div>
        </div>
        <p className="mb-2">Create a Education Here!</p>
        <Select onChange={selectOnChange} options={option}></Select>
        <p className="mt-5 create-experience-label mt-2">School</p>
        <input
          placeholder="Ricci"
          className="full-95 input-border mt-1"
          type="text"
          name="school"
          defaultValue={currData.School}
        />
        <p className="mt-5 create-experience-label mt-2">Degree</p>
        <input
          placeholder="S1"
          className="full-95 input-border mt-1"
          type="text"
          name="degree"
          defaultValue={currData.Degree}
        />
        <p className="mt-5 create-experience-label mt-2">Field</p>
        <input
          placeholder="Computer Science"
          className="full-95 input-border mt-1"
          type="text"
          name="field"
          defaultValue={currData.Field}
        />
        <p className="create-experience-label mt-2">Grade</p>
        <input
          placeholder="4"
          className="full-95 input-border mt-1"
          type="text"
          name="grade"
          defaultValue={currData.Grade}
        />
        <p className="create-experience-label mt-2">Activities</p>
        <input
          placeholder="Software Laboratory Centre"
          className="full-95 input-border mt-1"
          type="text"
          name="activities"
          defaultValue={currData.Activities}
        />
        <p className="create-experience-label mt-2">Description</p>
        <input
          placeholder="School in Jakarta"
          className="full-95 input-border mt-1"
          type="text"
          name="description"
          defaultValue={currData.Description}
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
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
