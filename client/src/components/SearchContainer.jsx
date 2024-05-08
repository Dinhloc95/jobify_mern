import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, Link, useSubmit } from "react-router-dom";
import { FormRow, SubmitBtn, FormRowSelect } from ".";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { useAllJobContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const submit = useSubmit();
  const { searchValue } = useAllJobContext();
  const { search, jobStatus, jobType, sort } = searchValue;
  const debounce = (onChange) => {
    let timeOut;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            name="jobStatus"
            labelName="Job Status"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="jobType"
            labelName="Job Type"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            labelName="Sort"
            list={[...Object.values(JOB_SORT_BY)]}
            defaultValue={sort}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
