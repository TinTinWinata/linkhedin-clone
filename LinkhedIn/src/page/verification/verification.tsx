import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastError } from "../../config/toast";
import { useLoading } from "../../hooks/loadingContext";
import { VALIDATE_QUERY } from "../../query/validate";
import { addCharacterToString } from "../../script/helper";

export default function Verification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const [validateFunc, { loading }] = useMutation(VALIDATE_QUERY);

  useEffect(() => {
    if (loading) {
      setLoading(true);
    }
  }, [loading]);

  useEffect(() => {
    if (id) {
      let gmail = id;
      const gmailIdx = gmail?.search("gmail");
      gmail = addCharacterToString(gmail, "@", gmailIdx);

      const comIdx = gmail?.search("com");
      gmail = addCharacterToString(gmail, ".", comIdx);

      validate(gmail);
    }
  }, [id]);

  function validate(email: String) {
    validateFunc({ variables: { email: email } })
      .then((resp) => {
        console.log("resp :", resp);
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        toastError(err.messsage);
        // console.log(err.message)
        navigate("/");
      });
  }

  return <div></div>;
}
