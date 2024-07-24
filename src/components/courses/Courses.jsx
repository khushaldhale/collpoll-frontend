import React, { useEffect } from "react";
import {
  CoursesByCategory,
  deleteCourse,
} from "../../redux/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const courses = useSelector((state) => state.course.courses);

  useEffect(() => {
    dispatch(CoursesByCategory({ categoryId })).then((data) => {
      if (data.payload.success) {
        console.log("All courses are fetched successfully");
      }
    });
  }, [dispatch, categoryId]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Courses</h2>

      <div className="mt-6 flex justify-center mb-4">
        <button
          onClick={() =>
            navigate(`/dashboard/admin/categories/${categoryId}/courses/add`)
          }
          className="border rounded-lg py-2 px-4 hover:bg-gray-200"
        >
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
            >
              <h3 className="text-xl font-semibold"> {element.course_name}</h3>
              <p className="text-gray-700">{element.course_desc}</p>
              <p className="text-gray-600">
                {" "}
                Lumpsum Price: ${element.lumpsum_price}
              </p>
              <p className="text-gray-600">
                Installment Price: ${element.installment_price}
              </p>
              <p className="text-gray-600">
                Number of Installment: ${element.number_of_installment}
              </p>

              {element.installments.map((element, index) => {
                return (
                  <div>
                    <p>installment Number {index + 1}</p>
                    <p>installment Amount {element.amount}</p>
                    <p>Installmet Due Day{element.due_day}</p>
                  </div>
                );
              })}

              <div className="flex flex-col space-y-4">
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/admin/categories/${categoryId}/courses/${element._id}/update`
                    )
                  }
                  className="border rounded-lg py-2 px-4 w-full text-center hover:bg-gray-200"
                >
                  Update Course
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      deleteCourse({ categoryId, courseId: element._id })
                    ).then((data) => {
                      if (data.payload.success) {
                        console.log("Course is deleted successfully");
                      }
                    })
                  }
                  className="border rounded-lg py-2 px-4 w-full text-center hover:bg-gray-200"
                >
                  Delete Course
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/admin/categories/${categoryId}/courses/${element._id}/sub`
                    )
                  }
                  className="border rounded-lg py-2 px-4 w-full text-center hover:bg-gray-200"
                >
                  View All Sub
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No courses are added yet</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
