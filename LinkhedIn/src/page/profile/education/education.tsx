import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import CreateExperience from "../../../component/Popup/CreateExperience/createExperience";
import ExperienceCard from "../experience-card/experienceCard";
import UpdateExperience from "../../../component/Popup/UpdateExperience/updateExperience";
import { EDUCATION_USER_QUERY } from "../../../query/education";
import EducationCard from "../education-card/educationCard";
import CreateEducation from "../../../component/Popup/CreateEducation/createEducation";
import UpdateEducation from "../../../component/Popup/UpdateEducation/updateEducation";
import { useUserAuth } from "../../../hooks/userContext";

export default function Education(props: any) {
  const id = props.id;
  const { user } = useUserAuth();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const { data, refetch } = useQuery(EDUCATION_USER_QUERY, {
    variables: { id: id },
  });

  function handleCreate() {
    setOpenCreate(true);
  }

  function handleUpdate() {
    setOpenUpdate(true);
  }

  return (
    <>
      {openUpdate ? (
        <UpdateEducation
          data={data.userEducation}
          refetch={refetch}
          id={id}
          setHandle={setOpenUpdate}
        />
      ) : (
        ""
      )}

      {openCreate ? (
        <CreateEducation refetch={refetch} id={id} setHandle={setOpenCreate} />
      ) : (
        ""
      )}

      <div className="flex">
        <h3>Education</h3>

        {user.id === id ? (
          <div className="icon">
            <FaPlus onClick={handleCreate} className="the-icon"></FaPlus>
            <FaPencilAlt
              onClick={handleUpdate}
              className="the-icon"
            ></FaPencilAlt>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="experience-list">
        {data
          ? data.userEducation.map((exp: any, idx: any) => {
              return (
                <EducationCard
                  key={idx}
                  refetch={refetch}
                  data={exp}
                ></EducationCard>
              );
            })
          : ""}
      </div>
    </>
  );
}
