import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import ReactSelect from "react-select";
import { toastError, toastSuccess } from "../../../config/toast";
import { UPDATE_MY_PROFILE_QUERY } from "../../../query/user";
import "./updateProfile.scss";

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

export default function UpdateProfile(props: any) {
  const setHandle = props.setHandle;
  const data = props.data;

  const [gender, setGender] = useState<string>();

  const [updateFunc] = useMutation(UPDATE_MY_PROFILE_QUERY);

  function handleSubmit(e: any) {
    e.preventDefault();
    const input = {
      FirstName: e.target.firstName.value,
      LastName: e.target.lastName.value,
      AdditionalName: e.target.addName.value,
      Gender: gender,
      Headline: e.target.headline.value,
    };
    updateFunc({ variables: { input: input } })
      .then((resp) => {
        props.refetch().then(() => {
          toastSuccess("Succesfully update user");
          setHandle(false);
        });
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  function handleCloseHandle() {
    setHandle(false);
  }

  function handleOnChange(e: any) {
    setGender(e.value);
  }

  return (
    <div  className="update-profile-container">
      <div className="popup"></div>
      <div className="popup-container">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex space-between">
            <h3>Update User</h3>
            <div className="center">
              <FaTimes onClick={handleCloseHandle} className="icon"></FaTimes>
            </div>
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
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
