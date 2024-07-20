import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const InstructorDashBoard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>This is Instrucor Dashboard</p>

      <div>
        <p
          onClick={() => {
            navigate("/dashboard/instructor/batches");
          }}
        >
          Instructor batches
        </p>
        <p
          onClick={() => {
            navigate("/dashboard/instructor/batches/allocation");
          }}
        >
          Batch Allocation
        </p>
        <p
          onClick={() => {
            navigate("/dashboard/instructor/batches/study");
          }}
        >
          Study Material
        </p>
      </div>

      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default InstructorDashBoard;
