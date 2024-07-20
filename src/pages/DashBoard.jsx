import React from "react";
import AdminDashBoard from "../components/dashboard/AdminDashBoard";
import CounsellorDashBoard from "../components/dashboard/CounsellorDashBoard";
import { useSelector } from "react-redux";
import accountType from "../constants/application";
import InstructorDashBoard from "../components/dashboard/InstructorDashBoard";
import StudentDashBoard from "../components/dashboard/StudentDashBoard";
const DashBoard = () => {
  const user = useSelector((state) => {
    return state.auth.user;
  });

  if (user.accountType === accountType.admin) {
    return (
      <div className="dashboard-container">
        <AdminDashBoard></AdminDashBoard>
      </div>
    );
  }
  if (user.accountType === accountType.counsellor) {
    return (
      <div className="dashboard-container">
        <CounsellorDashBoard></CounsellorDashBoard>
      </div>
    );
  }
  if (user.accountType === accountType.student) {
    return (
      <div className="dashboard-container">
        <StudentDashBoard></StudentDashBoard>
      </div>
    );
  }
  if (user.accountType === accountType.instructor) {
    return (
      <div className="dashboard-container">
        <InstructorDashBoard></InstructorDashBoard>
      </div>
    );
  }
};

export default DashBoard;
