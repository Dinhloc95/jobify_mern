import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { UseDashboardContext } from "../pages/DashboardLayout";

const BigSideBar = () => {
  const { toggleSideBar, isShowSideBar } = UseDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          isShowSideBar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="nav-container">
          <div className="content">
            <header>
              <Logo className="logo" />
            </header>
            <NavLinks isShowBigSideBar />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
