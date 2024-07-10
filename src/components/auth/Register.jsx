import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import accountType from "../../constants/application";

// student registeration is remained we have to provide courses which course they are inetred=sted in

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
    <div className="register-container">
      <form method="post" onSubmit={submitHandler}>
        <div className="form-row">
          <input
            type="text"
            name="fname"
            onChange={changeHandler}
            value={formData.fname}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lname"
            onChange={changeHandler}
            value={formData.lname}
            placeholder="Last Name"
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          value={formData.email}
          placeholder="Email"
        />

        <div className="form-row">
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            value={formData.password}
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={changeHandler}
            value={formData.confirmPassword}
            placeholder="Confirm Password"
          />
        </div>
        <input
          type="number"
          name="otp"
          onChange={changeHandler}
          value={formData.otp}
          placeholder="OTP"
        />
        <select
          name="accountType"
          onChange={changeHandler}
          value={formData.accountType}
        >
          <option value="">Select Account Type</option>
          <option value={accountType.student}>Student</option>
          <option value={accountType.instructor}>Instructor</option>
          <option value={accountType.counsellor}>Counsellor</option>
          <option value={accountType.admin}>Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
