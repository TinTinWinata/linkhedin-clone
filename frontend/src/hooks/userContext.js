import { createContext, useContext, useState } from "react";

const userContext = createContext();

const STORAGE_KEY = "FB911E970F29E146D493A4EEE52943B2";

export default function UserAuthProvider({ children }) {
  const [user, setUser] = useState();

  function getLocalStorage() {
    const temp = localStorage.getItem(STORAGE_KEY);
    const userStorage = JSON.parse(temp);
    if (userStorage === undefined || userStorage === null) {
      return false;
    } else {
      return userStorage;
    }
  }

  function setLocalStorage(user) {
    console.log("setting local storage : ", JSON.stringify(user));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  function update(user) {
    setUser(user);
    setLocalStorage(user);
  }

  function getUser() {
    if (user === undefined || user === null) {
      const userStorage = getLocalStorage();
      setUser(userStorage);
      return userStorage;
    }
    return user;
  }

  return (
    <userContext.Provider value={{ update, user, getUser }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userContext);
}
