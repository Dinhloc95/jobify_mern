import React, { createContext, useContext, useState } from "react";
import { BigSideBar, SmallSideBar, Navbar } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
const DashboardContext = createContext();
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = ({ isDarkThemeEnable }) => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [isShowSideBar, setShowSideBar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnable);

  const toggleSideBar = () => {
    setShowSideBar(!isShowSideBar);
  };
  const toggleDarkTheme = () => {
    const newIsDarkTheme = !isDarkTheme;
    setIsDarkTheme(newIsDarkTheme);
    document.body.classList.toggle("dark-theme", newIsDarkTheme),
      localStorage.setItem("dark-theme", newIsDarkTheme);
  };
  const logOutUser = async () => {
    navigate("/");
    await customFetch.get("auth/logout");
    toast.success("Logout Successful");
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        isShowSideBar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logOutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const UseDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
