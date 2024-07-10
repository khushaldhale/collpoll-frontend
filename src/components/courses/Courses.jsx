import React, { useEffect } from "react";
import {
  CoursesByCategory,
  deleteCourse,
} from "../../redux/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Courses.css";
const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { categoryId } = params;

  const courses = useSelector((state) => {
    return state.course.courses;
  });

  useEffect(() => {
    dispatch(CoursesByCategory({ categoryId })).then((data) => {
      if (data.payload.success) {
        console.log("all courses are fetched succefully");
      }
    });
  }, []);
  return (
    <div className="course-container">
      <div className="sec-1">
        {courses.length > 0 ? (
          courses.map((element) => {
            return (
              <div className="course">
                <p>{element.course_name}</p>
                <p>{element.course_desc}</p>
                <p>{element.course_price}</p>
                <p>{element.course_isInstallment}</p>
                <p>{element.installment_desc}</p>

                <button
                  onClick={() => {
                    navigate(
                      `/dashboard/admin/categories/${categoryId}/courses/${element._id}/update`
                    );
                  }}
                >
                  Update Course
                </button>

                <button
                  onClick={() => {
                    dispatch(
                      deleteCourse({ categoryId, courseId: element._id })
                    ).then((data) => {
                      if (data.payload.success) {
                        console.log("course is deleted succesfully");
                      }
                    });
                  }}
                >
                  Delete Course
                </button>

                <button
                  onClick={() => {
                    navigate(
                      `/dashboard/admin/categories/${categoryId}/courses/${element._id}/sub`
                    );
                  }}
                >
                  View All Sub
                </button>
              </div>
            );
          })
        ) : (
          <p> No courses are added yet</p>
        )}
      </div>

      <div className="sec-2">
        <button
          onClick={() => {
            navigate(`/dashboard/admin/categories/${categoryId}/courses/add`);
          }}
        >
          {" "}
          Add Course
        </button>
      </div>
    </div>
  );
};

export default Courses;
