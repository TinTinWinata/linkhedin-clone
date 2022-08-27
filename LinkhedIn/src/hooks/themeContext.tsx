import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({} as any);

export default function ThemeProvider({ children }: { children: any }) {
  const [currTheme, setTheme] = useState("light");

  const changeTheme = () => {
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light";
    });
  };

  const isDark = () => {
    if (currTheme === "dark") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ThemeContext.Provider value={{ currTheme, changeTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
