import React, { createContext, useContext, useState } from "react";

const loadingContext = createContext();

export default function LoadingContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <loadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </loadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(loadingContext);
}
