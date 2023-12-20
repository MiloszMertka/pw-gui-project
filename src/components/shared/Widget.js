import { useTheme } from "../../contexts/ThemeContext";
import { useMemo } from "react";

function Widget({ children, heading }) {
  const { isDarkMode } = useTheme();

  const shadowClass = useMemo(() => {
    return isDarkMode ? "shadow-light" : "shadow";
  }, [isDarkMode]);

  return (
    <section className={`p-3 d-flex flex-column rounded-2 ${shadowClass}`}>
      <h2 className="fw-semibold text-center my-5">{heading}</h2>
      {children}
    </section>
  );
}

export default Widget;
