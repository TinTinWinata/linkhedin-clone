import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { EXPERIENCE_USER_QUERY } from "../../../query/experience";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import CreateExperience from "../../../component/Popup/CreateExperience/createExperience";
import ExperienceCard from "../experience-card/experienceCard";
import UpdateExperience from "../../../component/Popup/UpdateExperience/updateExperience";
import { useUserAuth } from "../../../hooks/userContext";

export default function Experience(props: any) {
  const id = props.id;
  const { user } = useUserAuth();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const { data, refetch } = useQuery(EXPERIENCE_USER_QUERY, {
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
        <UpdateExperience
          data={data.userExperience}
          refetch={refetch}
          id={id}
          setHandle={setOpenUpdate}
        />
      ) : (
        ""
      )}

      {openCreate ? (
        <CreateExperience refetch={refetch} id={id} setHandle={setOpenCreate} />
      ) : (
        ""
      )}

      <div className="flex">
        <h3>Experience</h3>

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
          ? data.userExperience.map((exp: any, idx: BigInteger) => {
              return (
                <ExperienceCard
                  canEdit={user.id === id}
                  key={idx}
                  refetch={refetch}
                  data={exp}
                ></ExperienceCard>
              );
            })
          : ""}
      </div>
    </>
  );
}
