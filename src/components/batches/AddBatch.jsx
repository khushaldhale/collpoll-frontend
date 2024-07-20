import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createBatch } from "../../redux/slices/batchSlice";
import { getAllCourses } from "../../redux/slices/courseSlice";
import { getAllInstructor } from "../../redux/slices/instructorSlice";

// we have to show all the instructor s and courses here
// now instructirs are remained to fetch

const AddBatch = () => {
  const [formData, setFormData] = useState({
    start_time: undefined,
    end_time: undefined,
    instructor: "",
    course: "",
    batch_name: "",
    start_date: undefined,
    end_date: undefined,
  });
  const { labId } = useParams();

  const allCourses = useSelector((state) => {
    return state.course.allCourses;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const instructors = useSelector((state) => {
    return state.instructor.instructors;
  });

  useEffect(() => {
    dispatch(getAllCourses()).then((data) => {
      if (data.payload.success) {
        console.log("all courses are fetched succesfully");
      }
    });

    dispatch(getAllInstructor()).then((data) => {
      if (data.payload.success) {
        console.log("all instructors are fetched");
      }
    });
  }, []);

  function changeHandler(event) {
    const { type, name, value } = event.target;
    console.log(name, " : ", value);
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    formData.labId = labId;

    dispatch(createBatch(formData)).then((data) => {
      if (data.payload.success) {
        console.log("batch is created succesfully");
        navigate(`/dashboard/admin/labs/${labId}/batches`);
      }
    });
  }

  return (
    <div>
      <p>Add Bacth</p>

      <form method="post" onSubmit={submitHandler}>
        <input
          type="text"
          name="batch_name"
          id="batch_name"
          placeholder="Enter Batch Name"
          onChange={changeHandler}
        />
        <input
          type="time"
          name="start_time"
          id="start_time"
          min="00.00"
          max="23.59"
          placeholder="Enter Start Time"
          onChange={changeHandler}
        />
        <input
          type="time"
          name="end_time"
          id="end_time"
          min="00.00"
          max="23.59"
          placeholder="Enter End  Time"
          onChange={changeHandler}
        />

        <input
          type="date"
          name="start_date"
          id="start_date"
          placeholder="Enter Start Date"
          onChange={changeHandler}
        />

        <input
          type="date"
          name="end_date"
          id="end_date"
          placeholder="Enter End  Date"
          onChange={changeHandler}
        />
        <select name="course" id="course" onChange={changeHandler}>
          <option value="">Select any course</option>

          {allCourses.map((element) => {
            return <option value={element._id}> {element.course_name}</option>;
          })}
        </select>
        <select name="instructor" id="instructor" onChange={changeHandler}>
          <option value="">Select Instructor</option>

          {instructors.map((element) => {
            return (
              <option value={element._id}>
                {" "}
                {element.fname + " " + element.lname}
              </option>
            );
          })}
        </select>
        <button type="submit"> Create Batch</button>
      </form>
    </div>
  );
};

export default AddBatch;
