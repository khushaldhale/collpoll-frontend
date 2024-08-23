import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateBatch, particularBatch } from "../../redux/slices/batchSlice";
import { getAllCourses } from "../../redux/slices/courseSlice";
import { getAllInstructor } from "../../redux/slices/instructorSlice";

const UpdateBatch = () => {
  const { labId, batchId } = useParams();
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
    instructor: "",
    course: "",
    batch_name: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const allCourses = useSelector((state) => state.course.allCourses);
  const instructors = useSelector((state) => state.instructor.instructors);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCourses()).then((data) => {
      if (data.payload.success) {
        console.log("All courses are fetched successfully");
      }
    });

    dispatch(getAllInstructor()).then((data) => {
      if (data.payload.success) {
        console.log("All instructors are fetched");
      }
    });

    dispatch(particularBatch({ batchId })).then((data) => {
      if (data.payload.success) {
        const {
          start_time,
          end_time,
          instructor,
          course,
          batch_name,
          start_date,
          end_date,
          status,
        } = data.payload.data;
        setFormData({
          start_time,
          end_time,
          instructor: instructor._id,
          course: course._id,
          batch_name,
          start_date,
          end_date,
          status,
        });
        console.log("Information for the batch is fetched");
      }
    });
  }, [batchId, dispatch]);

  const validateField = (name, value) => {
    let error = "";

    if (name === "batch_name") {
      if (!value) {
        error = "Batch name is required";
      }
    } else if (name === "start_time") {
      if (!value) {
        error = "Start time is required";
      }
    } else if (name === "end_time") {
      if (!value) {
        error = "End time is required";
      } else if (
        value &&
        formData.start_time &&
        new Date(`1970-01-01T${value}`) <=
          new Date(`1970-01-01T${formData.start_time}`)
      ) {
        error = "End time should be greater than start time";
      } else if (value && formData.start_time) {
        const startTime = new Date(`1970-01-01T${formData.start_time}`);
        const endTime = new Date(`1970-01-01T${value}`);
        const difference = (endTime - startTime) / (1000 * 60);
        if (difference < 30) {
          error = "End time should be at least 30 minutes after start time";
        }
      }
    } else if (name === "start_date") {
      if (!value) {
        error = "Start date is required";
      } else if (
        new Date(value).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
      ) {
        error = "Start date cannot be in the past";
      }
    } else if (name === "end_date") {
      if (!value) {
        error = "End date is required";
      } else if (
        value &&
        formData.start_date &&
        new Date(value).setHours(0, 0, 0, 0) <
          new Date(formData.start_date).setHours(0, 0, 0, 0)
      ) {
        error = "End date cannot be before start date";
      }
    } else if (name === "course") {
      if (!value) {
        error = "Course selection is required";
      }
    } else if (name === "instructor") {
      if (!value) {
        error = "Instructor selection is required";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  function changeHandler(event) {
    const { name, value } = event.target;
    validateField(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    formData.labId = labId;
    formData.batchId = batchId;

    let valid = true;
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace("_", " ")} is required`;
        valid = false;
      } else {
        validateField(key, formData[key]);
        if (errors[key]) valid = false;
      }
    });
    setErrors(newErrors);
    if (valid) {
      dispatch(updateBatch(formData)).then((data) => {
        if (data.payload.success) {
          console.log("Batch updated successfully");
          navigate(`/dashboard/admin/labs/${labId}/batches`);
        }
      });
    }
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Batch</h2>
      <form
        method="post"
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="form-group mb-4">
          <label htmlFor="batch_name" className="block text-gray-700 mb-2">
            Batch Name
          </label>
          <input
            type="text"
            name="batch_name"
            id="batch_name"
            placeholder="Enter Batch Name"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.batch_name}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.batch_name && (
            <span className="text-red-500 text-sm">{errors.batch_name}</span>
          )}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="start_time" className="block text-gray-700 mb-2">
            Start Time
          </label>
          <input
            type="time"
            name="start_time"
            id="start_time"
            placeholder="Enter Start Time"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.start_time}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.start_time && (
            <span className="text-red-500 text-sm">{errors.start_time}</span>
          )}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="end_time" className="block text-gray-700 mb-2">
            End Time
          </label>
          <input
            type="time"
            name="end_time"
            id="end_time"
            placeholder="Enter End Time"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.end_time}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.end_time && (
            <span className="text-red-500 text-sm">{errors.end_time}</span>
          )}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="start_date" className="block text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            placeholder="Enter Start Date"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.start_date}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.start_date && (
            <span className="text-red-500 text-sm">{errors.start_date}</span>
          )}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="end_date" className="block text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            placeholder="Enter End Date"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.end_date}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.end_date && (
            <span className="text-red-500 text-sm">{errors.end_date}</span>
          )}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="course" className="block text-gray-700 mb-2">
            Course
          </label>
          <select
            name="course"
            id="course"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.course}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select a course</option>
            {allCourses.map((element) => (
              <option key={element._id} value={element._id}>
                {element.course_name}
              </option>
            ))}
          </select>
          {errors.course && (
            <span className="text-red-500 text-sm">{errors.course}</span>
          )}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="instructor" className="block text-gray-700 mb-2">
            Instructor
          </label>
          <select
            name="instructor"
            id="instructor"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.instructor}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select an instructor</option>
            {instructors.map((element) => (
              <option key={element._id} value={element._id}>
                {element.fname + " " + element.lname}
              </option>
            ))}
          </select>
          {errors.instructor && (
            <span className="text-red-500 text-sm">{errors.instructor}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Batch
        </button>
      </form>
    </div>
  );
};

export default UpdateBatch;
