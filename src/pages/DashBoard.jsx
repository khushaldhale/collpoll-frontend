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
    <div className="dashboard-container min-h-screen flex w-full h-screen bg-gradient-to-r from-blue-400 to-purple-400 p-4">
      <div className="w-full flex flex-col md:flex-row max-w-full bg-white shadow-lg rounded-lg p-6 md:p-8">
        {Content}
      </div>
    </div>
  );
};

export default DashBoard;
