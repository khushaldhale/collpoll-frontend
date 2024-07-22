import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPassword } from "../../redux/slices/authSlice";

const CreatePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    dispatch(createPassword(formData)).then((data) => {
      if (data.payload.success) {
        console.log("password is created successfully");
        navigate("/login");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full sm:p-8">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create Password
          </h2>
          <form method="post" onSubmit={submitHandler} className="space-y-4">
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={changeHandler}
              value={formData.email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={changeHandler}
              value={formData.password}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              onChange={changeHandler}
              value={formData.confirmPassword}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full py-2 border rounded-lg text-center hover:bg-gray-200"
            >
              Create Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
