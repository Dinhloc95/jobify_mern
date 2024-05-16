import React, { createContext, useContext, useState } from "react";
import {
  BigSideBar,
  SmallSideBar,
  Navbar,
  LoadingComponent,
} from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
const DashboardContext = createContext();
const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const response = await customFetch.get("/users/current-user");
    return response.data;
  },
};
export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = ({ isDarkThemeEnable }) => {
  //const { user } = useLoaderData();
  const { user } = useQuery(userQuery).data;
  const navigate = useNavigate();
  const [isShowSideBar, setShowSideBar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnable);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

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
    queryClient.invalidateQueries();
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
              {isLoading ? <LoadingComponent /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const UseDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
