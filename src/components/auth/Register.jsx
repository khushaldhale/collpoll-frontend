import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import accountType from "../../constants/application";
import { toast } from "react-toastify";

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

  const [errors, setErrors] = useState({});

  function validateField(name, value) {
    let error = "";
    switch (name) {
      case "fname":
        error = value.trim() === "" ? "First name is required" : "";
        break;
      case "lname":
        error = value.trim() === "" ? "Last name is required" : "";
        break;
      case "password":
        error = validatePassword(value)
          ? ""
          : "Password must have at least one uppercase, one lowercase, one number, and one special symbol";
        break;
      case "confirmPassword":
        error = value === formData.password ? "" : "Passwords do not match";
        break;
      case "accountType":
        error = value === "" ? "Please select an account type" : "";
        break;
      default:
        break;
    }
    return error;
  }

  function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  }

  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate field on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    // Validate field on blur
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    // Validate all fields
    const newErrors = {
      fname: validateField("fname", formData.fname),
      lname: validateField("lname", formData.lname),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
      accountType: validateField("accountType", formData.accountType),
    };

    setErrors(newErrors);

    const allValid = Object.values(newErrors).every((error) => error === "");

    if (allValid) {
      dispatch(registerUser(formData)).then((data) => {
        if (data.payload.success) {
          navigate("/login");
        }
      });
    } else {
      toast.error("Please fix the errors in the form.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
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
              onBlur={handleBlur}
              value={formData.fname}
              placeholder="First Name"
              className="input-field"
            />
            <input
              type="text"
              name="lname"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.lname}
              placeholder="Last Name"
              className="input-field"
            />
          </div>
          {errors.fname && <p className="text-red-500">{errors.fname}</p>}
          {errors.lname && <p className="text-red-500">{errors.lname}</p>}

          <input
            type="email"
            name="email"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.email}
            placeholder="Email"
            className="input-field mb-4"
            readOnly
          />
          <div className="form-row mb-4">
            <input
              type="password"
              name="password"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.password}
              placeholder="Password"
              className="input-field"
            />
            <input
              type="password"
              name="confirmPassword"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              className="input-field"
            />
          </div>
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
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
            onBlur={handleBlur}
            value={formData.accountType}
            className="input-field mb-4"
          >
            <option value="">Select Account Type</option>
            <option value={accountType.student}>Student</option>
            <option value={accountType.instructor}>Instructor</option>
            <option value={accountType.counsellor}>Counsellor</option>
            <option value={accountType.admin}>Admin</option>
          </select>
          {errors.accountType && (
            <p className="text-red-500">{errors.accountType}</p>
          )}
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
