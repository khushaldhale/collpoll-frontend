import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getstudentsByBatch } from "../../../redux/slices/studentSlice";
import { useLocation, useParams } from "react-router-dom";
import { particularBatch } from "../../../redux/slices/batchSlice";
import { markAttendance } from "../../../redux/slices/studentSlice";

const StudentsByBatch = () => {
  const studentsByBatch = useSelector((state) => state.student.studentsByBatch);
  const singleBatch = useSelector((state) => state.batch.singleBatch);
  const dispatch = useDispatch();
  const { batchId } = useParams();
  const location = useLocation();

  const [formData, setFormData] = useState({
    month: "",
    day: "",
    batch_id: batchId,
    subjectId: "",
    topicId: "",
    student_id: "",
    isPresent: undefined,
  });

  const path = location.pathname.split("/");
  const requiredPath = path[path.length - 1];

  useEffect(() => {
    dispatch(getstudentsByBatch({ batchId })).then((data) => {
      if (data.payload.success) {
        console.log("Students are fetched successfully");
      }
    });

    dispatch(particularBatch({ batchId })).then((data) => {
      if (data.payload.success) {
        console.log(" all data is fetched successfully");
      }
    });
  }, [dispatch, batchId]);

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function submitHandler(event, student_id, presence) {
    event.preventDefault();
    formData.student_id = student_id;
    formData.isPresent = presence;
    if (requiredPath === "attendance") {
      dispatch(markAttendance(formData)).then((data) => {
        if (data.payload.success) {
          console.log("Attendance is marked");
        }
      });
    }
  }

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-semibold mb-4">Students By Batch</h2>

      <div className="space-y-4">
        {requiredPath === "attendance" && (
          <form method="POST" className="space-y-4">
            <div className="flex flex-col space-y-2">
              <input
                type="month"
                id="month"
                name="month"
                placeholder="Enter Month"
                value={formData.month}
                onChange={changeHandler}
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="number"
                id="day"
                name="day"
                min="1"
                max="31"
                placeholder="Enter Day"
                value={formData.day}
                onChange={changeHandler}
                className="border border-gray-300 rounded-md p-2"
              />
              <select
                name="subjectId"
                id="subjectId"
                value={formData.subjectId}
                onChange={changeHandler}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Subject</option>
                {singleBatch &&
                  singleBatch.course.sub.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.sub_name}
                    </option>
                  ))}
              </select>
              <select
                name="topicId"
                id="topicId"
                value={formData.topicId}
                onChange={changeHandler}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Topic</option>
                {singleBatch &&
                  singleBatch.course.sub
                    .find((sub) => sub._id === formData.subjectId)
                    ?.topics.map((topic) => (
                      <option key={topic._id} value={topic._id}>
                        {topic.topic_name}
                      </option>
                    ))}
              </select>
            </div>
          </form>
        )}
        {studentsByBatch.length > 0 ? (
          studentsByBatch.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-2">
                {student.fname} {student.lname}
              </h3>
              {requiredPath === "attendance" && (
                <div className="flex gap-4 mt-2">
                  <button
                    type="button"
                    onClick={(event) => submitHandler(event, student._id, true)}
                    className="bg-green-500 text-white rounded-md py-2 px-4 w-full hover:bg-green-600 transition duration-300"
                  >
                    Mark Present
                  </button>
                  <button
                    type="button"
                    onClick={(event) =>
                      submitHandler(event, student._id, false)
                    }
                    className="bg-red-500 text-white rounded-md py-2 px-4 w-full hover:bg-red-600 transition duration-300"
                  >
                    Mark Absent
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No students are allocated to this batch
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentsByBatch;
