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
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4">
        {student ? (
          <>
            <p className="text-lg font-semibold">
              {student.course_enrolled.course_name}
            </p>
            <p className="text-gray-700">
              {student.course_enrolled.course_desc}
            </p>
            <p className="text-gray-700">
              {"Price: $" + student.course_enrolled.course_price}
            </p>
          </>
        ) : (
          <p className="text-gray-700 text-center">No course enrolled yet</p>
        )}
      </div>
    </div>
  );
};

export default CourseEnrolled;
