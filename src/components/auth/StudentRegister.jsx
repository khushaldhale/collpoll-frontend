import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentRegistration } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../redux/slices/courseSlice";
import accountType from "../../constants/application";

// student registeration is remained we have to provide courses which course they are inetred=sted in

const StudentRegister = () => {
  const email = useSelector((state) => state.auth.email);
  const allCourses = useSelector((state) => {
    return state.course.allCourses;
  });
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
        console.log("All courses are fetched succefully");
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

        <select
          name="course_interested_in"
          onChange={changeHandler}
          value={formData.course_interested_in}
        >
          <option value="">Select Course </option>

          {allCourses.map((element) => {
            return <option value={element._id}>{element.course_name}</option>;
          })}
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default StudentRegister;
