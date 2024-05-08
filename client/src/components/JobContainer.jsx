import React from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobContext } from "../pages/AllJobs";
import { NumberPageContainer } from "../components";

const JobContainer = () => {
  const { data } = useAllJobContext();
  const { jobs, totalJobs, numOfPage, currentPage } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No job to display ...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPage > 1 && <NumberPageContainer />}
    </Wrapper>
  );
};

export default JobContainer;
