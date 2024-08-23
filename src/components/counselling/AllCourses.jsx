import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/slices/courseSlice";

const AllCourses = () => {
  // ftching course from slice
  const allCourses = useSelector((state) => {
    return state.course.allCourses;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses()).then((data) => {
      if (data.payload.success) {
        console.log("all courses are fetched", data.payload.data);
      }
    });
  }, []);

  return (
    <div>
      <p>All courses</p>

      {allCourses.length > 0 ? (
        allCourses.map((element) => {
          return (
            <>
              {/*  show basic details */}
              <p>{element.course_name}</p>

              {/* show all subs */}

              {element.sub.map((element) => {
                return (
                  <>
                    <p>{element.sub_name}</p>

                    {/*  show all topics now */}

                    {element.topics.map((element) => {
                      return (
                        <>
                          <p>{element.topic_name}</p>
                        </>
                      );
                    })}
                  </>
                );
              })}
            </>
          );
        })
      ) : (
        <p> No courses are created yet</p>
      )}
    </div>
  );
};

export default AllCourses;
