import { useMutation } from "@apollo/client";
import React from "react";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import { toastError, toastSuccess } from "../../../config/toast";
import { CREATE_EDUCATION_QUERY } from "../../../query/education";
import "../CreateExperience/createExperience.scss";

export default function CreateEducation(props: any) {
  const refetch = props.refetch;
  const id = props.id;
  const setHandle = props.setHandle;

  const [createFunc] = useMutation(CREATE_EDUCATION_QUERY);

  function closeHandle() {
    setHandle(false);
  }
  function handleSubmit(e: any) {
    e.preventDefault();

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

    console.log(input);

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
          <h2>Education</h2>
          <div className="center">
            <FaTimes onClick={closeHandle} className="icon"></FaTimes>
          </div>
        </div>
        <p className="mb-2">Create a Education Here!</p>
        <p className="mt-5 create-experience-label mt-2">School</p>
        <input
          placeholder="Ricci"
          className="full-95 input-border mt-1"
          type="text"
          name="school"
        />
        <p className="mt-5 create-experience-label mt-2">Degree</p>
        <input
          placeholder="S1"
          className="full-95 input-border mt-1"
          type="text"
          name="degree"
        />
        <p className="mt-5 create-experience-label mt-2">Field</p>
        <input
          placeholder="Computer Science"
          className="full-95 input-border mt-1"
          type="text"
          name="field"
        />
        <p className="create-experience-label mt-2">Grade</p>
        <input
          placeholder="4"
          className="full-95 input-border mt-1"
          type="text"
          name="grade"
        />
        <p className="create-experience-label mt-2">Activities</p>
        <input
          placeholder="Software Laboratory Centre"
          className="full-95 input-border mt-1"
          type="text"
          name="activities"
        />
        <p className="create-experience-label mt-2">Description</p>
        <input
          placeholder="School in Jakarta"
          className="full-95 input-border mt-1"
          type="text"
          name="description"
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
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
