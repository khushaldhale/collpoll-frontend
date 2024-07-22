import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const InstructorDashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="instructor-dashboard flex w-full h-screen">
      <div className="sidebar-nav bg-gray-800 text-white w-64 flex-shrink-0 p-4">
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/instructor/batches")}
        >
          Instructor Batches
        </p>
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/instructor/batches/allocation")}
        >
          Batch Allocation
        </p>
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/instructor/batches/study")}
        >
          Study Material
        </p>
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/instructor/attendance")}
        >
          Attendance
        </p>
      </div>
      <div className="sidebar-content flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default InstructorDashBoard;
