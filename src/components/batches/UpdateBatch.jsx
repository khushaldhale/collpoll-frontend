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

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    formData.labId = labId;
    formData.batchId = batchId;

    dispatch(updateBatch(formData)).then((data) => {
      if (data.payload.success) {
        console.log("Batch updated successfully");
        navigate(`/dashboard/admin/labs/${labId}/batches`);
      }
    });
  }

  return (
    <div className="update-batch-container p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Batch</h2>

      <form
        method="post"
        onSubmit={submitHandler}
        className="bg-white shadow-lg rounded-lg p-6"
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
            value={formData.batch_name}
            className="w-full border rounded-md p-2"
          />
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
            value={formData.start_time}
            className="w-full border rounded-md p-2"
          />
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
            value={formData.end_time}
            className="w-full border rounded-md p-2"
          />
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
            value={formData.start_date}
            className="w-full border rounded-md p-2"
          />
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
            value={formData.end_date}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="course" className="block text-gray-700 mb-2">
            Course
          </label>
          <select
            name="course"
            id="course"
            onChange={changeHandler}
            value={formData.course}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select a course</option>
            {allCourses.map((element) => (
              <option key={element._id} value={element._id}>
                {element.course_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="instructor" className="block text-gray-700 mb-2">
            Instructor
          </label>
          <select
            name="instructor"
            id="instructor"
            onChange={changeHandler}
            value={formData.instructor}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Instructor</option>
            {instructors.map((element) => (
              <option key={element._id} value={element._id}>
                {element.fname + " " + element.lname}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="status" className="block text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            id="status"
            onChange={changeHandler}
            value={formData.status}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Status</option>
            <option value="in progress">In Progress</option>
            <option value="finished">Finished</option>
            <option value="overdue">Overdue</option>
            <option value="yet to start">Yet to Start</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn bg-blue-500 text-white rounded-md py-2 px-4 mt-4 w-full hover:bg-blue-600"
        >
          Update Batch
        </button>
      </form>
    </div>
  );
};

export default UpdateBatch;
