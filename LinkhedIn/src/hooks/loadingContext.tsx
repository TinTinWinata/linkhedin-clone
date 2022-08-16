import React, { createContext, useContext, useState } from "react";



const loadingContext = createContext({} as any);

export default function LoadingContextProvider({ children }:{children: JSX.Element}) {
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
