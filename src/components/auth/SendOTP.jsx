import React, { useState } from "react";

const SendOTP = ({ setIsRegistered }) => {
  const [email, setEmail] = useState("");

  const sendOTPHandler = (event) => {
    event.preventDefault();
    // logic to send OTP goes here
    // after OTP is sent, setIsRegistered to true
    setIsRegistered(true);
  };

  return (
    <div className="flex items-center justify-center h-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form onSubmit={sendOTPHandler} className="space-y-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendOTP;
