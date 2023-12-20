import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
      enableDarkMode();
    }
  }, []);

  const enableDarkMode = () => {
    document.body.dataset.bsTheme = "dark";
    localStorage.setItem("theme", "dark");
    setIsDarkMode(true);
  };

  const disableDarkMode = () => {
    document.body.dataset.bsTheme = "light";
    localStorage.setItem("theme", "light");
    setIsDarkMode(false);
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, enableDarkMode, disableDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
