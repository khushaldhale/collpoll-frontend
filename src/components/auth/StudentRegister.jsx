import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentRegistration } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../redux/slices/courseSlice";
import accountType from "../../constants/application";
import { toast } from "react-toastify";

const StudentRegister = () => {
  const email = useSelector((state) => state.auth.email);
  const allCourses = useSelector((state) => state.course.allCourses);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: email,
    accountType: accountType.student,
    course_interested_in: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllCourses()).then((data) => {
      if (data.payload.success) {
        console.log("All courses are fetched successfully");
      }
    });
  }, [dispatch]);

  function validateField(name, value) {
    let error = "";
    switch (name) {
      case "fname":
        error = value.trim() === "" ? "First name is required" : "";
        break;
      case "lname":
        error = value.trim() === "" ? "Last name is required" : "";
        break;
      case "email":
        error = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ? "Invalid email address"
          : "";
        break;
      case "course_interested_in":
        error = value === "" ? "Please select a course" : "";
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
      fname: validateField("fname", formData.fname),
      lname: validateField("lname", formData.lname),
      email: validateField("email", formData.email),
      course_interested_in: validateField(
        "course_interested_in",
        formData.course_interested_in
      ),
    };

    setErrors(newErrors);

    const allValid =
      Object.values(newErrors).every((error) => error === "") &&
      formData.fname.trim() !== "" &&
      formData.lname.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.course_interested_in !== "";

    if (allValid) {
      dispatch(studentRegistration(formData)).then((data) => {
        if (data.payload.success) {
          toast.success("Registration successful!");
          navigate("/");
        }
      });
    } else {
      toast.error("Please fix the errors in the form.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Student Registration
        </h2>
        <form method="post" onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              type="text"
              name="fname"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.fname}
              placeholder="First Name"
              className="input-field mb-1"
            />
            {errors.fname && <p className="text-red-500">{errors.fname}</p>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="lname"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.lname}
              placeholder="Last Name"
              className="input-field mb-1"
            />
            {errors.lname && <p className="text-red-500">{errors.lname}</p>}
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.email}
              placeholder="Email"
              className="input-field mb-1"
              readOnly
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <select
              name="course_interested_in"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.course_interested_in}
              className="input-field mb-1"
            >
              <option value="">Select Course</option>
              {allCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.course_name}
                </option>
              ))}
            </select>
            {errors.course_interested_in && (
              <p className="text-red-500">{errors.course_interested_in}</p>
            )}
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
