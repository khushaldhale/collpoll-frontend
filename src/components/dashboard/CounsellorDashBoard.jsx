// src/components/dashboard/CounsellorDashBoard.js
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CounsellorDashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="counsellor-dashboard flex w-full min-h-[calc(100vh-7rem)]">
      <div className="sidebar-nav bg-gray-800 text-white w-64 h-[calc(100vh-7rem)] fixed p-4">
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/counsellor/pending/counselling")}
        >
          Pending Counselling
        </p>
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/counsellor/performance")}
        >
          Performance
        </p>
      </div>
      <div className="content flex-1 ml-64 p-4 min-h-[calc(100vh-7rem)]">
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CounsellorDashBoard;
