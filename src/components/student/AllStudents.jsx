import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/slices/courseSlice";
import { allBatches } from "../../redux/slices/batchSlice";
import {
  allStudentsByBatch,
  allStudentsByCourse,
} from "../../redux/slices/studentSlice";

const AllStudents = () => {
  const allStudents = useSelector((state) => {
    return state.student.allStudents;
  });

  const batches = useSelector((state) => {
    return state.batch.batches;
  });

  const allCourses = useSelector((state) => {
    return state.course.allCourses;
  });

  const dispatch = useDispatch();
  // have to fetch all the batches
  // have to fetch  all the  courses

  useEffect(() => {
    dispatch(getAllCourses()).then((data) => {
      if (data.payload.success) {
        console.log("all courses  are fetched succesfully");
      }
    });

    dispatch(allBatches()).then((data) => {
      if (data.payload.success) {
        console.log("all batches are fetched");
      }
    });
  }, []);

  function changeHandler(event) {
    if (event.target.name === "batch") {
      dispatch(allStudentsByBatch({ batchId: event.target.value })).then(
        (data) => {
          if (data.payload.success) {
            console.log("all students by batch are fetched");
          }
        }
      );
    } else {
      dispatch(allStudentsByCourse({ courseId: event.target.value })).then(
        (data) => {
          if (data.payload.success) {
            console.log("all students by batch are fetched");
          }
        }
      );
    }
  }

  return (
    <div>
      <p>choose a batch or a course</p>

      <form method="post">
        <select name="batch" id="batch" onChange={changeHandler}>
          <option value="">select any batch</option>
          {batches.length > 0 &&
            batches.map((element) => {
              return (
                <option value={element._id}> {element.batch_name} </option>
              );
            })}
        </select>
        <select name="course" id="course" onChange={changeHandler}>
          <option value="">select any course</option>
          {allCourses.length > 0 &&
            allCourses.map((element) => {
              return (
                <option value={element._id}> {element.course_name} </option>
              );
            })}
        </select>
      </form>

      {allStudents &&
        allStudents.map((element) => {
          return (
            <div>
              <p>{element.fname}</p>
            </div>
          );
        })}
    </div>
  );
};

export default AllStudents;
