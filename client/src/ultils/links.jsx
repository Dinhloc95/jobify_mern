import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdAssignmentAdd } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { MdQueryStats } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";

const Links = [
  {
    text: "add job",
    path: ".",
    icon: <MdAssignmentAdd />,
  },
  {
    text: "all jobs",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <FaChartBar />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <CgProfile />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <RiAdminFill />,
  },
];
export default Links;
