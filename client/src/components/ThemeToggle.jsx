import React from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { UseDashboardContext } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = UseDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillMoonFill />
      ) : (
        <BsFillSunFill className="toggle-icon" />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
