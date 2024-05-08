import React from "react";
import { ChartContainer, StatsContainer } from "../components";
import customFetch from "../../../utils/customFetch";
import { useLoaderData } from "react-router-dom";
export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <div>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </div>
  );
};

export default Stats;
