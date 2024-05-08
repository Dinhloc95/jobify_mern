import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { UseDashboardContext } from "../pages/DashboardLayout";
import { FaTimesCircle } from "react-icons/fa";
import Logo from "./Logo";
import NavLinks from "../components/NavLinks";

const SmallSideBar = () => {
  const { isShowSideBar, toggleSideBar } = UseDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          isShowSideBar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="nav-container">
          <div className="content">
            <button type="button" className="close-btn" onClick={toggleSideBar}>
              <FaTimesCircle />
            </button>
            <header>
              <Logo />
            </header>
            <NavLinks />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
