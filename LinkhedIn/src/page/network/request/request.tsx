import "../network.scss";

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useUserAuth } from "../../../hooks/userContext";
import { useRefetch } from "../../../hooks/refetchContext";

export default function Request() {
  const { refetch } = useRefetch();
  const { user } = useUserAuth();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="network-request">
      <div className="shadow container">
        {}
        </div>
    </div>
  );
}
