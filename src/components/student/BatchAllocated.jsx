import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentInfo } from "../../redux/slices/studentSlice";

const BatchAllocated = () => {
  const student = useSelector((state) => state.student.student);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(studentInfo()).then((data) => {
      if (data.payload.success) {
        console.log("Student data is fetched");
      }
    });
  }, [dispatch]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Batch Allocated
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        {student ? (
          <>
            <p className="text-lg font-semibold">
              Batch Name:{" "}
              <span className="font-normal">
                {student.batch_allocated.batch_name}
              </span>
            </p>
            <p className="text-gray-700">
              Start Date:{" "}
              <span className="font-normal">
                {student.batch_allocated.start_date.split("T")[0]}
              </span>
            </p>
            <p className="text-gray-700">
              End Date:{" "}
              <span className="font-normal">
                {student.batch_allocated.end_date.split("T")[0]}
              </span>
            </p>
            <p className="text-gray-700">
              Start Time:{" "}
              <span className="font-normal">
                {student.batch_allocated.start_time.split("T")[0]}
              </span>
            </p>
            <p className="text-gray-700">
              End Time:{" "}
              <span className="font-normal">
                {student.batch_allocated.end_time.split("T")[0]}
              </span>
            </p>
            <p className="text-gray-700">
              Instructor Name:{" "}
              <span className="font-normal">
                {student.batch_allocated.instructor.fname}{" "}
                {student.batch_allocated.instructor.lname}
              </span>
            </p>
          </>
        ) : (
          <p className="text-gray-700 text-center">No batch allocated yet</p>
        )}
      </div>
    </div>
  );
};

export default BatchAllocated;
