import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import accountType from "../../constants/application";

const Register = () => {
  const email = useSelector((state) => state.auth.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: email,
    password: "",
    confirmPassword: "",
    otp: "",
    accountType: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      if (data.payload.success) {
        navigate("/login");
      }
    });
  }

  return (
    <div className="min-h-68 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form method="post" onSubmit={submitHandler}>
          <div className="form-row mb-4">
            <input
              type="text"
              name="fname"
              onChange={changeHandler}
              value={formData.fname}
              placeholder="First Name"
              className="input-field"
            />
            <input
              type="text"
              name="lname"
              onChange={changeHandler}
              value={formData.lname}
              placeholder="Last Name"
              className="input-field"
            />
          </div>
          <input
            type="email"
            name="email"
            onChange={changeHandler}
            value={formData.email}
            placeholder="Email"
            className="input-field mb-4"
          />
          <div className="form-row mb-4">
            <input
              type="password"
              name="password"
              onChange={changeHandler}
              value={formData.password}
              placeholder="Password"
              className="input-field"
            />
            <input
              type="password"
              name="confirmPassword"
              onChange={changeHandler}
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              className="input-field"
            />
          </div>
          <input
            type="number"
            name="otp"
            onChange={changeHandler}
            value={formData.otp}
            placeholder="OTP"
            className="input-field mb-4"
          />
          <select
            name="accountType"
            onChange={changeHandler}
            value={formData.accountType}
            className="input-field mb-4"
          >
            <option value="">Select Account Type</option>
            <option value={accountType.student}>Student</option>
            <option value={accountType.instructor}>Instructor</option>
            <option value={accountType.counsellor}>Counsellor</option>
            <option value={accountType.admin}>Admin</option>
          </select>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
