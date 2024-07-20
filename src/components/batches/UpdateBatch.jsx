import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateBatch, particularBatch } from "../../redux/slices/batchSlice";
import { getAllCourses } from "../../redux/slices/courseSlice";
import { getAllInstructor } from "../../redux/slices/instructorSlice";

const UpdateBatch = () => {
  const { labId, batchId } = useParams();
  console.log(labId, batchId);
  const [formData, setFormData] = useState({
    start_time: undefined,
    end_time: undefined,
    instructor: "",
    course: "",
    batch_name: "",
    start_date: undefined,
    end_date: undefined,
    status: "",
  });

  const allCourses = useSelector((state) => {
    return state.course.allCourses;
  });

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

    dispatch(particularBatch({ batchId })).then((data) => {
      console.log(data.payload);
      if (data.payload.success) {
        console.log("Information for the batch is fetched");
        setFormData({
          // start_time: data.payload.data.start_time,
          // end_time: data.payload.data.end_time,
          // instructor: `${data.payload.data.instructor.fname}  ${data.payload.data.instructor.lname}`,
          // course: data.payload.data.course.course_name,
          // batch_name: data.payload.data.batch_name,
          // start_date: data.payload.data.start_date,
          // end_date: data.payload.data.end_date,
        });
      }
    });
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function changeHandler(event) {
    const { type, name, value } = event.target;
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
    formData.batchId = batchId;

    dispatch(updateBatch(formData)).then((data) => {
      if (data.payload.success) {
        console.log("batch is updated succesfully");
        navigate(`/dashboard/admin/labs/${labId}/batches`);
      }
    });
  }

  return (
    <div>
      <p>Update Bacth</p>

      <form method="post" onSubmit={submitHandler}>
        <input
          type="text"
          name="batch_name"
          id="batch_name"
          placeholder="Enter Batch Name"
          onChange={changeHandler}
          value={formData.batch_name}
        />
        <input
          type="time"
          name="start_time"
          id="start_time"
          min="00.00"
          max="23.59"
          placeholder="Enter Start Time"
          onChange={changeHandler}
          value={formData.start_time}
        />
        <input
          type="time"
          name="end_time"
          id="end_time"
          min="00.00"
          max="23.59"
          placeholder="Enter End  Time"
          onChange={changeHandler}
          value={formData.end_time}
        />
        <input
          type="date"
          name="start_date"
          id="start_date"
          placeholder="Enter Start Date"
          onChange={changeHandler}
          value={formData.start_date}
        />

        <input
          type="date"
          name="end_date"
          id="end_date"
          placeholder="Enter End  Date"
          onChange={changeHandler}
          value={formData.end_date}
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

        <select name="status" id="status" onChange={changeHandler}>
          <option value="">Select Status </option>
          <option value="in progress">In Progress</option>
          <option value="finished">Finished </option>
          <option value="overdue">Overdue</option>
          <option value="yet to start">yet to start</option>
        </select>
        <button type="submit"> Update Batch</button>
      </form>
    </div>
  );
};

export default UpdateBatch;
