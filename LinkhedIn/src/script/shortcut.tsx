import React, { ReactFragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/themeContext";

export function Shortcut({ children }: { children: any }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { changeTheme } = useTheme();

  const handleKey = useCallback((event: any) => {
    if (event.altKey === true) {
      if (event.key == "w") {
        changeTheme();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return <>{children}</>;
}
