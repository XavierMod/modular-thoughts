import { useState, useEffect } from "react";
import { FaLightbulb, FaMoon, FaSun } from "react-icons/fa";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  margin: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 2rem;

  background: var(--toggle-background-color);

  z-index: 1;
`;

const ToggleMode = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("xm-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("xm-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <a onClick={toggleTheme}>
      <Wrapper>{theme === "light" ? <FaMoon /> : <FaLightbulb />}</Wrapper>
    </a>
  );
};

export default ToggleMode;
