import React from "react";
import { UseDashboardContext } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";
import links from "../ultils/links";

const NavLinks = ({ isShowBigSideBar }) => {
  const { toggleSideBar, user } = UseDashboardContext();
  console.log(isShowBigSideBar);
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        if (path === "admin" && user.role !== "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isShowBigSideBar ? null : toggleSideBar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
