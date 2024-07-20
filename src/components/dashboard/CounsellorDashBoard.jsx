import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CounsellorDashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="counsellor-dashboard">
      <div className="container">
        <div className="sidebar-nav">
          <p
            className="sidebar-item"
            onClick={() =>
              navigate("/dashboard/counsellor/pending/counselling")
            }
          >
            Pending Counselling
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

export default CounsellorDashBoard;
