import React from "react";
import {
  useNavigation,
  useOutletContext,
  Form,
  redirect,
  useLoaderData,
  useParams,
} from "react-router-dom";
//import Wrapper from "../assets/wrappers/DashboardFormPage";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success("Update Job Successful");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditJob = () => {
  const params = useParams();
  const { job } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <div className="form-title">Edit Job</div>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            labelName="position"
            defaultValue={job.position}
          />
          <FormRow
            type="text"
            name="company"
            labelName="company"
            defaultValue={job.company}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelName="Job Location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelName="Job Status"
            list={Object.values(JOB_STATUS)}
            defaultValue={job.jobStatus}
          />
          <FormRowSelect
            name="jobType"
            labelName="Job Type"
            list={Object.values(JOB_TYPE)}
            defaultValue={job.jobType}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
