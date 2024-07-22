import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const StudentDashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="student-dashboard flex w-full h-screen">
      <div className="sidebar-nav bg-gray-800 text-white w-64 flex-shrink-0 p-4">
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/student/enrolled-courses")}
        >
          Enrolled Courses
        </p>
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/student/batch-allocated")}
        >
          Batch Allocated
        </p>
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/student/study-material")}
        >
          Study Material
        </p>
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/student/feedbacks")}
        >
          Feedback
        </p>
      </div>
      <div className="sidebar-content flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashBoard;
