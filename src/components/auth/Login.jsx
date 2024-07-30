import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function validateField(name, value) {
    let error = "";
    switch (name) {
      case "email":
        error =
          value && /\S+@\S+\.\S+/.test(value)
            ? ""
            : "Please enter a valid email address";
        break;
      case "password":
        error =
          value &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
            ? ""
            : "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
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
    };

    setErrors(newErrors);

    const allValid = Object.values(newErrors).every((error) => error === "");

    if (allValid) {
      dispatch(loginUser(formData)).then((data) => {
        if (data.payload.success) {
          navigate("/dashboard");
        }
      });
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form className="space-y-4" method="post" onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.email}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.password}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
