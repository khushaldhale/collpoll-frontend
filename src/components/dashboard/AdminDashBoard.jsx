// src/components/dashboard/AdminDashBoard.js
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard flex w-full h-screen">
      <div className="sidebar-nav bg-gray-800 text-white w-64 flex-shrink-0 p-4">
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/admin/categories")}
        >
          Categories
        </p>
        <p
          className="sidebar-item cursor-pointer mb-4 hover:bg-gray-700 p-2 rounded"
          onClick={() => navigate("/dashboard/admin/labs")}
        >
          Labs
        </p>
        {/* Add more sidebar items as needed */}
      </div>
      <div className="sidebar-content flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashBoard;
