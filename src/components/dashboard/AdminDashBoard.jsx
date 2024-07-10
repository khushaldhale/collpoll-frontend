import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./AdminDashBoard.css";

const AdminDashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="sidebar-nav">
          <p
            className="sidebar-item"
            onClick={() => navigate("/dashboard/admin/categories")}
          >
            Categories
          </p>
          <p
            className="sidebar-item"
            onClick={() => navigate("/dashboard/admin/labs")}
          >
            Labs
          </p>
          {/* Add more sidebar items as needed */}
        </div>
        <div className="sidebar-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
