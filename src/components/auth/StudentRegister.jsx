import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentRegistration } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../redux/slices/courseSlice";
import accountType from "../../constants/application";

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

  useEffect(() => {
    dispatch(getAllCourses()).then((data) => {
      if (data.payload.success) {
        console.log("All courses are fetched successfully");
      }
    });
  }, []);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    dispatch(studentRegistration(formData)).then((data) => {
      if (data.payload.success) {
        navigate("/");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Student Registration
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

          <select
            name="course_interested_in"
            onChange={changeHandler}
            value={formData.course_interested_in}
            className="input-field mb-4"
          >
            <option value="">Select Course</option>
            {allCourses.map((element) => (
              <option key={element._id} value={element._id}>
                {element.course_name}
              </option>
            ))}
          </select>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
