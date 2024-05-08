import React from "react";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers//StatsContainer";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard");
  }
};
const Admin = () => {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        count={users}
        title="current-user"
        icon={<FaSuitcaseRolling />}
        color="#e9b949"
        bcg="#fcefc7"
      />

      <StatItem
        count={jobs}
        title="total jobs"
        icon={<FaCalendarCheck />}
        color="#647acb"
        bcg="#e0e8f9"
      />
    </Wrapper>
  );
};

export default Admin;
