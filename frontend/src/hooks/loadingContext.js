import { createContext, useContext, useState } from "react";

const loadingContext = createContext();

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState();

  return (
    <loadingContext.Provider value={(loading, setLoading)}>
      {children}
    </loadingContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(loadingContext);
}
