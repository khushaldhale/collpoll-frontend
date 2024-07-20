import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getstudentsByBatch } from "../../../redux/slices/studentSlice";
import { useLocation, useParams } from "react-router-dom";
import { particularBatch } from "../../../redux/slices/batchSlice";
import { markAttendance } from "../../../redux/slices/attendanceSlice";

const StudentsByBatch = () => {
  const studentsByBatch = useSelector((state) => {
    return state.student.studentsByBatch;
  });

  const { batchId } = useParams();

  const singleBatch = useSelector((state) => {
    return state.batch.singleBatch;
  });

  const [formData, setFormData] = useState({
    month: undefined,
    day: undefined,
    batch_id: batchId,
    subjectId: "",
    topicId: "",
    student_id: "",
    // isPresent: undefined,   we will set it up later
  });

  const dispatch = useDispatch();

  const location = useLocation();

  const path = location.pathname.split("/");
  const requiredPath = path[path.length - 1];

  useEffect(() => {
    dispatch(getstudentsByBatch({ batchId })).then((data) => {
      if (data.payload.success) {
        console.log("students are fetched succesfully");
      }
    });
  }, []);

  function chnageHandler(event) {
    const { type, name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }
  function submitHandler(event, student_id) {
    event.preventDefault();

    formData.student_id = student_id;

    const { type, name, value } = event.target;

    // ispresent key shoudl be added
    if (name === "present") {
      formData.isPresent = true;

      dispatch(markAttendance(formData)).then((data) => {
        if (data.payload.success) {
          console.log("Attendance is marked");
        }
      });
    } else {
      // make him absent here
      formData.isPresent = false;

      dispatch(markAttendance(formData)).then((data) => {
        if (data.payload.success) {
          console.log("Attendance is marked");
        }
      });
    }

    // conditional work
  }

  return (
    <div>
      <div>
        {studentsByBatch.length > 0 ? (
          studentsByBatch.map((element) => {
            return (
              <div>
                <p>{element.fname}</p>
                <p>{element.lname}</p>

                {requiredPath === "attendance" && (
                  <form
                    method="POST"
                    onSubmit={(event) => {
                      submitHandler(event, element._id);
                    }}
                  >
                    <input
                      type="month"
                      id="month"
                      name="month"
                      placeholder="Enter Month"
                      onChange={chnageHandler}
                    />

                    <input
                      type="number"
                      id="day"
                      name="day"
                      min="1"
                      max="31"
                      placeholder="Enter Day"
                      onChange={chnageHandler}
                    ></input>

                    <select
                      name="subjectId"
                      id="subjectId"
                      onChange={chnageHandler}
                    >
                      <option value="">Select sub </option>
                      {singleBatch.course.sub.map((element) => {
                        return (
                          <option value={element._id}>
                            {element.sub_name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      name="topicId"
                      id="subjectId"
                      onChange={chnageHandler}
                    >
                      <option value="">Select Topic </option>
                      {singleBatch.course.sub.topics.map((element) => {
                        return (
                          <option value={element._id}>
                            {element.topic_name}
                          </option>
                        );
                      })}
                    </select>

                    <button type="submit" name="present">
                      {" "}
                      Mark Present
                    </button>
                    <button type="submit" name="absent">
                      {" "}
                      Mark Absent
                    </button>
                  </form>
                )}
              </div>
            );
          })
        ) : (
          <p>No students are allocated to this batch</p>
        )}
      </div>
    </div>
  );
};

export default StudentsByBatch;
