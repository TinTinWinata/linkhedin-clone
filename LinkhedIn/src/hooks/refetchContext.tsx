import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { USER_FETCH_QUERY } from "../query/user";
import { useUserAuth } from "./userContext";

const refetchContext = createContext({} as any);

export default function RefetchProvider({ children }: { children: any }) {
  const { update } = useUserAuth();
  const { data, refetch } = useQuery(USER_FETCH_QUERY);

  useEffect(() => {
    console.log("test ", data);
    if (data) {
      console.log(data);
    }
  }, [data]);

  const value = { refetch };

  return (
    <refetchContext.Provider value={value}>{children}</refetchContext.Provider>
  );
}

export function useRefetch() {
  return useContext(refetchContext);
}
