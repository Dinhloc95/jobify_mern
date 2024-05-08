import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddJob,
  AllJobs,
  Admin,
  DashboardLayout,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from "./pages";
//loader
import { loader as loaderAllJobs } from "./pages/AllJobs";
import { loader as loaderDashboard } from "./pages/DashboardLayout";
import { loader as loaderEditJob } from "./pages/EditJob";
import { loader as loaderAdmin } from "./pages/Admin";
import { loader as loaderStats } from "./pages/Stats";

//action
import { action as actionRegister } from "./pages/Register";
import { action as actionLogin } from "./pages/Login";
import { action as actionAddJob } from "./pages/AddJob";
import { action as actionEditJob } from "./pages/EditJob";
import { action as actionDelete } from "./pages/DeleteJob";
import { action as actionProfile } from "./pages/Profile";

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("dark-theme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};
const isDarkThemeEnable = checkDefaultTheme();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: actionRegister,
      },
      {
        path: "login",
        element: <Login />,
        action: actionLogin,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnable={isDarkThemeEnable} />,
        loader: loaderDashboard,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: actionAddJob,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: loaderAllJobs,
          },
          {
            path: "delete-job/:id",
            action: actionDelete,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: loaderEditJob,
            action: actionEditJob,
          },
          {
            path: "error",
            element: <Error />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: actionProfile,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: loaderStats,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: loaderAdmin,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
