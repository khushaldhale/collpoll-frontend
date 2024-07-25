import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/slices/courseSlice";
import { allBatches } from "../../redux/slices/batchSlice";
import {
  allStudentsByBatch,
  allStudentsByCourse,
} from "../../redux/slices/studentSlice";

const AllStudents = () => {
  const allStudents = useSelector((state) => state.student.allStudents);
  const batches = useSelector((state) => state.batch.batches);
  const allCourses = useSelector((state) => state.course.allCourses);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses()).then((data) => {
      if (data.payload.success) {
        console.log("All courses are fetched successfully");
      }
    });

    dispatch(allBatches()).then((data) => {
      if (data.payload.success) {
        console.log("All batches are fetched");
      }
    });
  }, [dispatch]);

  const changeHandler = (event) => {
    if (event.target.name === "batch") {
      console.log("batch is is ", event.target.value);
      dispatch(allStudentsByBatch({ batchId: event.target.value })).then(
        (data) => {
          if (data.payload.success) {
            console.log("All students by batch are fetched");
          }
        }
      );
    } else {
      dispatch(allStudentsByCourse({ courseId: event.target.value })).then(
        (data) => {
          if (data.payload.success) {
            console.log("All students by course are fetched");
          }
        }
      );
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Fetch students filtered by batch or course
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="batch"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Batch
          </label>
          <select
            name="batch"
            id="batch"
            onChange={changeHandler}
            className="block w-full p-3 text-lg text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select any batch</option>
            {batches.length > 0 &&
              batches.map((element) => (
                <option key={element._id} value={element._id}>
                  {element.batch_name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="course"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Course
          </label>
          <select
            name="course"
            id="course"
            onChange={changeHandler}
            className="block w-full p-3 text-lg text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select any course</option>
            {allCourses.length > 0 &&
              allCourses.map((element) => (
                <option key={element._id} value={element._id}>
                  {element.course_name}
                </option>
              ))}
          </select>
        </div>
      </form>

      <div className="bg-white shadow-md rounded-lg p-6">
        {allStudents?.length > 0 ? (
          <ul className="space-y-4">
            {allStudents.map((element) => (
              <li
                key={element._id}
                className="bg-gray-50 border border-gray-200 rounded-md p-4 flex flex-col space-y-2"
              >
                <p className="text-lg font-semibold text-gray-800">
                  Full Name: {element.fname + " " + element.lname}
                </p>
                <p className="text-lg font-semibold text-gray-600">
                  Email: {element.email}
                </p>
                {/* Add additional student data here */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 text-center">No students allocated</p>
        )}
      </div>
    </div>
  );
};

export default AllStudents;
