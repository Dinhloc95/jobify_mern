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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorElement } from "./components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

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
        action: actionLogin(queryClient),
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnable={isDarkThemeEnable} />,
        loader: loaderDashboard(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: actionAddJob(queryClient),
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: loaderAllJobs(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "delete-job/:id",
            action: actionDelete(queryClient),
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: loaderEditJob(queryClient),
            action: actionEditJob(queryClient),
          },
          {
            path: "error",
            element: <Error />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: actionProfile(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            loader: loaderStats(queryClient),
            errorElement: <ErrorElement />,
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
