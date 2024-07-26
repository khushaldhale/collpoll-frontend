// src/pages/Register.js
import { useState } from "react";
import RegisterUSER from "../components/auth/Register";
import SendOTP from "../components/auth/SendOTP";

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-7rem)] bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full sm:p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {isRegistered ? "Register User" : "Send OTP"}
        </h2>
        {isRegistered ? (
          <RegisterUSER />
        ) : (
          <SendOTP setIsRegistered={setIsRegistered} />
        )}
      </div>
    </div>
  );
};

export default Register;
