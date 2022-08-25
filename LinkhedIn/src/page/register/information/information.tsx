import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ReactSelect from "react-select";
import { UPDATE_PROFILE_WITH_ID } from "../../../query/user";
import "./information.scss";

const options = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

export default function Information(props: any) {
  const navigate = useNavigate();
  const [updateFunc] = useMutation(UPDATE_PROFILE_WITH_ID);
  const id = props.id;
  const [gender, setGender] = useState<string>();

  console.log("id : ", id);

  function handleSubmit(e: any) {
    e.preventDefault();
    const input = {
      FirstName: e.target.firstName.value,
      LastName: e.target.lastName.value,
      AdditionalName: e.target.addName.value,
      Gender: gender,
      Headline: e.target.headline.value,
    };
    updateFunc({ variables: { input: input, id: id } }).then(() => {
      navigate("/login");
    });
  }

  function handleOnChange(e: any) {
    setGender(e.value);
  }

  return (
    <div className="center information-container bg-color-bg">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex space-between">
          <h2>Update User</h2>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="color-invic">
            First Name
          </label>
          <input type="text" name="firstName" className="input-border" />
          <label htmlFor="" className="color-invic">
            Last Name
          </label>
          <input type="text" name="lastName" className="input-border" />
          <label htmlFor="" className="color-invic">
            Additional Name
          </label>
          <input type="text" name="addName" className="input-border" />
          <label htmlFor="" className="color-invic">
            Gender
          </label>
          <ReactSelect
            onChange={handleOnChange}
            options={options}
            className="select"
          ></ReactSelect>
          <label htmlFor="" className="color-invic">
            Headline
          </label>
          <input type="text" name="headline" className="input-border" />
          <button type="submit" className="mt-5">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
