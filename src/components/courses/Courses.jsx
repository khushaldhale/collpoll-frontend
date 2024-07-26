import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  CoursesByCategory,
  deleteCourse,
} from "../../redux/slices/courseSlice";

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
    <div className="p-4 max-w-full">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold mb-6">Courses</h2>
        <div className="flex justify-center mb-6">
          <button
            onClick={() =>
              navigate(`/dashboard/admin/categories/${categoryId}/courses/add`)
            }
            className="border rounded-md py-2 px-4 hover:bg-gray-200"
          >
            Add Course
          </button>
        </div>
        <div className="space-y-6">
          {courses.length > 0 ? (
            courses.map((element) => (
              <div
                key={element._id}
                className="bg-gray-100 shadow-sm rounded-md p-6 flex flex-col space-y-4 w-full"
              >
                <h3 className="text-xl font-semibold">{element.course_name}</h3>
                <p className="text-gray-700">{element.course_desc}</p>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <p className="text-gray-600">
                    Lumpsum Price: ₹{element.lumpsum_price}
                  </p>
                  {element.isInstallment ? (
                    <p className="text-gray-600">
                      Installment Price: ₹{element.installment_price}
                    </p>
                  ) : (
                    <p>Installment option is not available</p>
                  )}
                </div>
                {element.isInstallment && (
                  <p className="text-gray-600">
                    Number of Installment: {element.number_of_installment}
                  </p>
                )}

                {element.isInstallment && (
                  <div className="flex flex-col md:flex-row md:flex-wrap md:space-x-4">
                    {element.installments.map((installment, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 p-3 rounded-md mb-2 md:w-1/4"
                      >
                        <p className="font-medium">Installment {index + 1}</p>
                        <p>Amount: ₹{installment.amount}</p>
                        <p>Due Day: {installment.due_day}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:space-x-4">
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/admin/categories/${categoryId}/courses/${element._id}/update`
                      )
                    }
                    className="border rounded-md py-2 px-4 w-full md:w-auto text-center text-white  bg-yellow-500 hover:bg-yellow-600"
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
                    className="border rounded-md py-2 px-4 w-full md:w-auto text-center text-white  bg-red-500 hover:bg-red-600"
                  >
                    Delete Course
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/admin/categories/${categoryId}/courses/${element._id}/sub`
                      )
                    }
                    className="border rounded-md py-2 px-4 w-full md:w-auto text-center text-white  bg-green-500 hover:bg-green-600"
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
    </div>
  );
};

export default Courses;
