import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CounsellorDashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="counsellor-dashboard flex w-full h-screen">
      <div className="sidebar-nav bg-gray-800 text-white w-64 flex-shrink-0 p-4">
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/counsellor/pending/counselling")}
        >
          Pending Counselling
        </p>
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => {
            navigate("/dashboard/counsellor/performance");
          }}
        >
          Performance
        </p>
      </div>
      <div className="sidebar-content flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default CounsellorDashBoard;
