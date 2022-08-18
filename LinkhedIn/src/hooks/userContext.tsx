import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { USER_FETCH_QUERY } from "../query/user";

const userContext = createContext({} as any);
const STORAGE_KEY = "FB911E970F29E146D493A4EEE52943B2";

export default function UserAuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState(Object);

  function getLocalStorage() {
    const temp = localStorage.getItem(STORAGE_KEY) || "";
    if (temp === "") return false;
    const userStorage = JSON.parse(temp);
    if (userStorage === undefined || userStorage === null) {
      return false;
    } else {
      return userStorage;
    }
  }

  function setLocalStorage(user: Object) {
    // console.log("setting local storage : ", JSON.stringify(user));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  function update(user: Object) {
    setUser(user);
    setLocalStorage(user);
  }

  function getUser() {
    if (user === undefined || user === null || Object.keys(user).length == 0) {
      const userStorage = getLocalStorage();
      setUser(userStorage);
      return userStorage;
    }
    return user;
  }

  const value = { update, user, getUser };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export function useUserAuth() {
  return useContext(userContext);
}
