import React, { createContext, useContext } from "react";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { JobContainer, SearchContainer } from "../components";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "Newest",
      page ?? 1,
    ],
    queryFn: async () => {
      let response = await customFetch("/jobs", { params });
      return response.data;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValue: { ...params } };
  };
const allJobContext = createContext();

const AllJobs = () => {
  const { searchValue } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValue));
  return (
    <allJobContext.Provider value={{ data, searchValue }}>
      <div>
        <SearchContainer />
        <JobContainer />
      </div>
    </allJobContext.Provider>
  );
};
export const useAllJobContext = () => useContext(allJobContext);

export default AllJobs;
