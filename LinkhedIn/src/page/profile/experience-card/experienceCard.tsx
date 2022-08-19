import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toastError, toastSuccess } from "../../../config/toast";
import { DELETE_EXPERIENCE_QUERY } from "../../../query/experience";

import "./experienceCard.scss";

export default function ExperienceCard(props: any) {
  const data = props.data;
  const refetch = props.refetch;
  const canEdit = props.canEdit;

  const [deleteFunc] = useMutation(DELETE_EXPERIENCE_QUERY);

  function handleDelete() {
    deleteFunc({
      variables: {
        id: data.ID,
      },
    })
      .then(() => {
        toastSuccess("Succesfully deleted data!");
        refetch();
      })
      .catch((err) => {
        console.log(err);
        toastError(err.message);
      });
  }

  return (
    <>
      <div className="experience-card">
        <img src="https://picsum.photos/200" alt="" />
        <div className="desc">
          <div className="flex">
            <p className="header-text">
              {data.Title} ({data.Industry})
            </p>

            {canEdit ? (
              <div className="center">
                <FaTrashAlt
                  onClick={handleDelete}
                  className="trash-icon"
                ></FaTrashAlt>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="experience-flex">
            <p>{data.Location}</p>
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
