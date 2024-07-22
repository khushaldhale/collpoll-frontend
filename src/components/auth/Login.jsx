// src/components/auth/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserLogin = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data.payload.success) {
        navigate("/dashboard");
      }
    });
  }

  return (
    <div className="login-container">
      <form
        className="login-form space-y-4"
        method="post"
        onSubmit={submitHandler}
      >
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          value={formData.email}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          value={formData.password}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
