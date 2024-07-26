import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentInfo } from "../../redux/slices/studentSlice";

const CourseEnrolled = () => {
  const student = useSelector((state) => state.student.student);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(studentInfo()).then((data) => {
      if (data.payload.success) {
        console.log("student data is fetched");
      }
    });
  }, [dispatch]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Course Enrolled
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {student ? (
          <>
            <h3 className="text-xl font-semibold mb-2">
              {student.course_enrolled.course_name}
            </h3>
            <p className="text-gray-700 mb-4">
              {student.course_enrolled.course_desc}
            </p>
            <div className="text-center">
              <button className="btn border rounded-md py-2 px-4 bg-blue-500 text-white hover:bg-blue-600">
                View Course Details
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-700 text-center">No course enrolled yet</p>
        )}
      </div>
    </div>
  );
};

export default CourseEnrolled;
