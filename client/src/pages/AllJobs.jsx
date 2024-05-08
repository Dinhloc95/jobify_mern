import React, { createContext, useContext } from "react";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { JobContainer, SearchContainer } from "../components";
export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await customFetch("/jobs", { params });
    return { data, searchValue: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const allJobContext = createContext();

const AllJobs = () => {
  const { data, searchValue } = useLoaderData();
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
