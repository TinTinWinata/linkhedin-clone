import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { toastError } from "../config/toast";
import { USER_FETCH_QUERY } from "../query/user";
import { useUserAuth } from "./userContext";

const refetchContext = createContext({} as any);

export default function RefetchProvider({ children }: { children: any }) {
  const { update, user } = useUserAuth();
  const { refetch } = useQuery(USER_FETCH_QUERY);

  function refetchUser() {
    refetch()
      .then((resp) => {
        const newUser = { ...resp.data.whoisme, token: user.token };
        console.log("new user : ", newUser);

        update(newUser);
      })
      .catch((err) => {
        toastError(err.message);
      });
  }

  const value = { refetchUser };

  return (
    <refetchContext.Provider value={value}>{children}</refetchContext.Provider>
  );
}

export function useRefetch() {
  return useContext(refetchContext);
}
