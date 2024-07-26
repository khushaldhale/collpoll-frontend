// src/pages/Login.js
import React from "react";
import UserLogin from "../components/auth/Login";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-7rem)] bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full sm:p-8">
        <UserLogin />
      </div>
    </div>
  );
};

export default Login;
