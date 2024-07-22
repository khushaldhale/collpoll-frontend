import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  feedbacksViaBatch,
  instructorPerformanceViaBatch,
} from "../../redux/slices/feedbackSlice";
import { getAllInstructor } from "../../redux/slices/instructorSlice";
import { batchesByInstructorId } from "../../redux/slices/batchSlice";
const InstructorFeedback = () => {
  const feedbacks_via_Batch = useSelector((state) => {
    return state.feedback.feedbackByBatch;
  });

  // all instructor, all batches of instructor, their useEffsct

  const instructors = useSelector((state) => {
    return state.instructor.instructors;
  });

  const instructorBatches = useSelector((state) => {
    return state.batch.instructorBatches;
  });

  const performance = useSelector((state) => {
    return state.feedback.performance;
  });

  const [formData, setFormData] = useState({
    instructorId: "",
    batchId: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInstructor()).then((data) => {
      if (data.payload.success) {
        console.log("all instructors are fetched");
      }
    });
  }, []);

  function changeHandler(event) {
    const { name, type, value } = event.target;
    if (name === "instructorId") {
      dispatch(batchesByInstructorId({ instructorId: value })).then((data) => {
        if (data.payload.success) {
          console.log("instructor batches are fetched");
        }
      });

      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        };
      });
    } else {
      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        };
      });
    }
  }
  function submitHandler(event) {
    event.preventDefault();
    console.log(formData);

    dispatch(feedbacksViaBatch(formData)).then((data) => {
      if (data.payload.success) {
        console.log("all feedbacks via batch are fetched");
      }
    });

    // we are directly mapping performnce here not putting itbin redux
    dispatch(instructorPerformanceViaBatch(formData)).then((data) => {
      if (data.payload.success) {
        console.log("performance is fetched");
      }
    });
  }
  return (
    <div>
      <p>InstructorFeedback</p>

      <form method="POST" onSubmit={submitHandler}>
        <select name="instructorId" id="instructorId" onChange={changeHandler}>
          <option value=""> select any instructor</option>
          {instructors.length > 0 &&
            instructors.map((element) => {
              return (
                <option value={element._id}>
                  {" "}
                  {element.fname + " " + element.lname}
                </option>
              );
            })}
        </select>
        <select name="batchId" id="batchId" onChange={changeHandler}>
          <option value=""> select any Batch</option>
          {instructorBatches.length > 0 &&
            instructorBatches.map((element) => {
              return <option value={element._id}> {element.batch_name}</option>;
            })}
        </select>
        <button type="submit">Feedbacks</button>
      </form>

      <div>{performance && <div>{"average rating : " + performance}</div>}</div>
      <div>
        {feedbacks_via_Batch.length > 0 ? (
          feedbacks_via_Batch.map((element) => {
            return (
              <div>
                <p>{"Rating : " + element.rating}</p>
                <p>{"Reviews  : " + element.reviews}</p>
                <p>{"Subject : " + element.subject.sub_name}</p>
                <p>{"Topic : " + element.topic.topic_name}</p>
                <p>
                  {"Student : " +
                    element.student.fname +
                    " " +
                    element.student.lname}
                </p>
              </div>
            );
          })
        ) : (
          <p> No feedbacks for this batch and instructor</p>
        )}
      </div>
    </div>
  );
};

export default InstructorFeedback;
