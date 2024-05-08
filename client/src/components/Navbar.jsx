import React from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "../components/Logo";
import { UseDashboardContext } from "../pages/DashboardLayout";
import LogOutContainer from "../components/LogOutContainer";
import ThemeToggle from "../components/ThemeToggle";

const Navbar = () => {
  const { toggleSideBar } = UseDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo className="logo" />
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogOutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
