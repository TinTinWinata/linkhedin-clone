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
  const [validateFunc] = useMutation(VALIDATE_QUERY);

  useEffect(() => {
    setLoading(true);
    if (id) {
      validate();
    }
  }, [id]);

  function validate() {
    validateFunc({ variables: { id: id } })
      .then((resp) => {
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        toastError(err.messsage);
      });
  }

  return <div></div>;
}
