import React from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { UseDashboardContext } from "../pages/DashboardLayout";

const LogOutContainer = () => {
  const [isShowLogOut, setShowLogOut] = useState(false);
  const { user, logOutUser } = UseDashboardContext();
  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => {
          setShowLogOut(!isShowLogOut);
        }}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}

        {user?.name}
        <FaCaretDown />
      </button>
      <div className={isShowLogOut ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logOutUser}>
          LogOut
        </button>
      </div>
    </Wrapper>
  );
};

export default LogOutContainer;
