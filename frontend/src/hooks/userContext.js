import { createContext, useContext, useState } from "react";

const userContext = createContext();

export default function UserAuthProvider({ children }) {
  const [user, setUser] = useState();

  function login() {

  }

  function register() {
    
  }

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export function useUserAuth() {
  return useContext(userContext);
}
