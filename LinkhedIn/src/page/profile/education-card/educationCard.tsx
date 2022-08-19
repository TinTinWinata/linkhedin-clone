import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toastError, toastSuccess } from "../../../config/toast";
import { DELETE_EDUCATION_QUERY } from "../../../query/education";
import { DELETE_EXPERIENCE_QUERY } from "../../../query/experience";

import "../experience-card/experienceCard.scss";

export default function EducationCard(props: any) {
  const data = props.data;
  const refetch = props.refetch;

  const [deleteFunc] = useMutation(DELETE_EDUCATION_QUERY);

  function handleDelete() {
    deleteFunc({
      variables: {
        id: data.ID,
      },
    })
      .then(() => {
        toastSuccess("Succesfully deleted education!");
        refetch();
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  return (
    <>
      <div className="experience-card">
        <img src="https://picsum.photos/300" alt="" />
        <div className="desc">
          <div className="flex">
            <p className="header-text">
              {data.School} - {data.Degree}
            </p>
            <div className="center">
              <FaTrashAlt
                onClick={handleDelete}
                className="trash-icon"
              ></FaTrashAlt>
            </div>
          </div>
          <div className="experience-flex">
            <p>{data.Description}</p>
            <div className="date">
              {data.StartYear} - {data.EndYear}
            </div>
          </div>
        </div>
      </div>
      <div className="experience-card-border"></div>
    </>
  );
}
