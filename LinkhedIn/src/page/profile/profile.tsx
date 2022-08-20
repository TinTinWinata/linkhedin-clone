import { useMutation, useQuery } from "@apollo/client";
import { setDefaultResultOrder } from "dns";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import UpdateProfile from "../../component/Popup/UpdateProfile/updateProfile";
import { toastError, toastSuccess } from "../../config/toast";
import { useLoading } from "../../hooks/loadingContext";
import { useRefetch } from "../../hooks/refetchContext";
import { useUserAuth } from "../../hooks/userContext";
import { CONNECT_REQUEST_QUERY } from "../../query/connect";
import {
  FIND_USER_QUERY,
  FOLLOW_USER_QUERY,
  UPDATE_USER_QUERY,
} from "../../query/user";
import { sendImage } from "../../script/image";
import Education from "./education/education";
import Experience from "./experience/experience";
import "./profile.scss";
import Pdf from "react-to-pdf";

export default function Profile() {
  const { id } = useParams();
  const { user } = useUserAuth();
  const { setLoading } = useLoading();
  const { refetchUser } = useRefetch();

  const { data, error, refetch } = useQuery(FIND_USER_QUERY, {
    variables: { id: id },
  });

  const [connectFunc] = useMutation(CONNECT_REQUEST_QUERY);
  const [followFunc] = useMutation(FOLLOW_USER_QUERY);
  const [updateFunc] = useMutation(UPDATE_USER_QUERY);

  const [updateHandle, setUpdateHandle] = useState<boolean>();
  const renderPdf = useRef<any>();

  function handleFollow() {
    followFunc({ variables: { id: id } })
      .then((resp) => {
        toastSuccess("Succesfully follow " + data.user.name);
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  function handleOpenUpdate() {
    setUpdateHandle(true);
  }

  function handleConnect() {
    connectFunc({ variables: { id: id, text: "" } })
      .then((resp) => {
        toastSuccess("Succesfully send request to " + data.user.name);
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  function imageOnChange(e: any) {
    setLoading(true);
    const img = e.target.files[0];
    sendImage(img)
      .then((url) => {
        const input = {
          Name: "",
          Email: "",
          PhotoProfile: url,
          Headline: "",
          BgPhotoProfile: "",
        };

        updateFunc({
          variables: {
            id: user.id,
            input: input,
          },
        })
          .then(() => {
            refetchUser();
            toastSuccess("Succesfully change image");
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            toastError(err.message);
          });
      })
      .catch((err) => {
        setLoading(false);
        toastError(err.message);
      });
  }

  function handleChangeBgImage(e: any) {
    setLoading(true);
    const img = e.target.files[0];
    sendImage(img)
      .then((url) => {
        const input = {
          Name: "",
          Email: "",
          PhotoProfile: "",
          Headline: "",
          BgPhotoProfile: url,
        };

        updateFunc({
          variables: {
            id: user.id,
            input: input,
          },
        })
          .then(() => {
            refetchUser();
            toastSuccess("Succesfully change image");
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            toastError(err.message);
          });
      })
      .catch((err) => {
        setLoading(false);
        toastError(err.message);
      });
  }

  function handlePDF() {}

  if (data) console.log(data.user);

  return (
    <>
      {updateHandle ? (
        <UpdateProfile
          refetch={refetch}
          setHandle={setUpdateHandle}
          data={data}
        ></UpdateProfile>
      ) : (
        ""
      )}

      <div id="pdf-here" className="center flex-col">
        <div ref={renderPdf} className="profile-center-container">
          <div className="profile-container shadow">
            <div className="description">
              <label htmlFor="input-file">
                <img
                  id="img-photo-profile"
                  src={data ? data.user.PhotoProfile : ""}
                  alt=""
                />
              </label>
              <input
                onChange={imageOnChange}
                className="none"
                id="input-file"
                type="file"
              />
              {data && user.id === data.user.id ? (
                <button onClick={handleOpenUpdate}>Update</button>
              ) : (
                ""
              )}
              <Pdf
                targetRef={renderPdf}
                filename={`${data ? data.user.name : "profile"}.pdf`}
              >
                {({ toPdf }: { toPdf: any }) => (
                  <button onClick={toPdf}>Generate Pdf</button>
                )}
              </Pdf>
              {/* <button onClick={handlePDF}>Save to PDF< /button> */}

              {data && user.id !== data.user.id ? (
                <>
                  <button onClick={handleFollow}>Follow</button>
                  <button onClick={handleConnect}>Connect</button>
                </>
              ) : (
                ""
              )}
              <div className="flex space-between">
                <h1 className="name">{data ? data.user.name : ""}</h1>
                <div className="flex profile-view">
                  <p className="">{data ? data.user.ProfileViews : ""}</p>
                  <FaEye className="eye-icon"></FaEye>
                </div>
              </div>
              <p className="email">
                {data ? data.user.Headline : ""} -{" "}
                {data ? data.user.Gender : ""}
              </p>
            </div>

            <div
              style={{
                backgroundImage: `url('${
                  data ? data.user.BgPhotoProfile : ""
                }')`,
              }}
              className="profile-container-image"
            >
              <div className="change-camera">
                {data && user.id === data.user.id ? (
                  <label htmlFor="bg-image">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="camera-svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                ) : (
                  ""
                )}

                <input
                  onChange={handleChangeBgImage}
                  className="none"
                  type="file"
                  id="bg-image"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="profile-container shadow experience">
            <div className="container">
              <Experience id={id}></Experience>
            </div>
          </div>
          <div className="profile-container shadow experience">
            <div className="container">
              <Education id={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
