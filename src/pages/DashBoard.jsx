import React from "react";
import AdminDashBoard from "../components/dashboard/AdminDashBoard";
import CounsellorDashBoard from "../components/dashboard/CounsellorDashBoard";
import { useSelector } from "react-redux";
import accountType from "../constants/application";
import InstructorDashBoard from "../components/dashboard/InstructorDashBoard";
import StudentDashBoard from "../components/dashboard/StudentDashBoard";

const DashBoard = () => {
  const user = useSelector((state) => state.auth.user);

  let Content;

  switch (user.accountType) {
    case accountType.admin:
      Content = <AdminDashBoard />;
      break;
    case accountType.counsellor:
      Content = <CounsellorDashBoard />;
      break;
    case accountType.student:
      Content = <StudentDashBoard />;
      break;
    case accountType.instructor:
      Content = <InstructorDashBoard />;
      break;
    default:
      Content = <p>Invalid user type</p>;
  }

  return (
    <div className="dashboard-container min-h-[calc(100vh-7rem)] w-full flex flex-col md:flex-row">
      <div className="content flex-1   min-h-[calc(100vh-7rem)]">
        <div className="bg-white shadow-lg rounded-lg ">{Content}</div>
      </div>
    </div>
  );
};

export default DashBoard;
