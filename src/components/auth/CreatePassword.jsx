import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPassword } from "../../redux/slices/authSlice";

const CreatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  function validateField(name, value) {
    let error = "";
    switch (name) {
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !emailPattern.test(value) ? "Invalid email address" : "";
        break;
      case "password":
        error =
          value.length < 6 ? "Password must be at least 6 characters" : "";
        break;
      case "confirmPassword":
        error = value !== formData.password ? "Passwords do not match" : "";
        break;
      default:
        break;
    }
    return error;
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
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
    };

    setErrors(newErrors);

    const allValid = Object.values(newErrors).every((error) => error === "");

    if (allValid) {
      dispatch(createPassword(formData)).then((data) => {
        if (data.payload.success) {
          console.log("Password is created successfully");
          navigate("/login");
        }
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full sm:p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Password
        </h2>
        <form method="post" onSubmit={submitHandler} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.password}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.confirmPassword}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Create Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
