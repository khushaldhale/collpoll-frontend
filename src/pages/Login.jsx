// src/pages/Login.js
import React from "react";
import UserLogin from "../components/auth/Login";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full sm:p-8">
        <UserLogin />
      </div>
    </div>
  );
};

export default Login;
