import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFeedbacksViaBatch,
  feedbacksViaBatch,
  instructorPerformanceViaBatch,
} from "../../redux/slices/feedbackSlice";
import { getAllInstructor } from "../../redux/slices/instructorSlice";
import { batchesByInstructorId } from "../../redux/slices/batchSlice";
import { subByCourse } from "../../redux/slices/subjectSlice";
const InstructorFeedback = () => {
  const feedbacks_via_Batch = useSelector(
    (state) => state.feedback.feedbackByBatch
  );
  const instructors = useSelector((state) => state.instructor.instructors);
  const instructorBatches = useSelector(
    (state) => state.batch.instructorBatches
  );

  const subViaCourse = useSelector((state) => state.subject.subByCourse);
  const performance = useSelector((state) => state.feedback.performance);

  const [formData, setFormData] = useState({
    instructorId: "",
    batchId: "",
    subject: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInstructor()).then((data) => {
      if (data.payload.success) {
        console.log("All instructors are fetched");
      }
    });
  }, [dispatch]);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "instructorId") {
      dispatch(batchesByInstructorId({ instructorId: value })).then((data) => {
        if (data.payload.success) {
          console.log("Instructor batches are fetched", data.payload.data);
        }
      });
    }

    if (name === "batchId") {
      const selectedIndex = event.target.selectedIndex;
      const selectedOption = event.target.options[selectedIndex];
      const course_id = selectedOption.getAttribute("data-course");
      console.log(course_id);

      dispatch(subByCourse({ courseId: course_id })).then((data) => {
        if (data.payload.success) {
          console.log("all subjects are fetched");
          console.log(data.payload.data);
        }
      });
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(feedbacksViaBatch(formData)).then((data) => {
      if (data.payload.success) {
        console.log("All feedbacks via batch are fetched");
      }
    });

    dispatch(instructorPerformanceViaBatch(formData)).then((data) => {
      if (data.payload.success) {
        console.log("Performance is fetched");
      }
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Instructor Feedback
      </h2>

      <form method="POST" onSubmit={submitHandler} className="space-y-4 mb-6">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="instructorId"
            className="text-sm font-medium text-gray-700"
          >
            Select Instructor
          </label>
          <select
            name="instructorId"
            id="instructorId"
            onChange={changeHandler}
            className="block w-full p-3 text-lg text-gray-700 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select any instructor</option>
            {instructors.length > 0 &&
              instructors.map((element) => (
                <option key={element._id} value={element._id}>
                  {element.fname + " " + element.lname}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="batchId"
            className="text-sm font-medium text-gray-700"
          >
            Select Batch
          </label>
          <select
            name="batchId"
            id="batchId"
            onChange={changeHandler}
            className="block w-full p-3 text-lg text-gray-700 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select any batch</option>
            {instructorBatches.length > 0 &&
              instructorBatches.map((element) => (
                <option
                  key={element._id}
                  value={element._id}
                  data-course={element.course._id}
                >
                  {element.batch_name}
                </option>
              ))}
          </select>

          {/*  provide subjects and topic as well , then fetch */}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Fetch Feedbacks
        </button>
      </form>

      {/* feedback deletion should be done separately */}

      {/*  feedback deletion code  */}
      {/*  also provide subject and topic ID  */}
      {/* {feedbacks_via_Batch.length > 0 && (
        <button
          className="border p-2"
          onClick={() => {
            dispatch(deleteFeedbacksViaBatch(formData)).then((data) => {
              if (data.payload.success) {
                console.log("All feedbacks of this batch are deleted");
              }
            });
          }}
        >
          Delete Following Feedbacks
        </button>
      )} */}

      {performance && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-2">Performance</h3>
          <p className="text-gray-700">Average Rating: {performance}</p>
        </div>
      )}
      {feedbacks_via_Batch.length > 0 && <p>filter subjects via subject</p>}

      {feedbacks_via_Batch.length > 0 && (
        <select name="subject" id="subject" onChange={changeHandler}>
          <option> select any sub</option>
          {subViaCourse.map((element) => {
            return (
              <option id={element._id} value={element._id}>
                {element.sub_name}
              </option>
            );
          })}
        </select>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks_via_Batch.length > 0 ? (
          feedbacks_via_Batch.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <h3 className="text-xl font-bold mb-2">
                Rating: {element.rating}
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Reviews:</span>{" "}
                {element.reviews}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Subject:</span>{" "}
                {element.subject.sub_name}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Topic:</span>{" "}
                {element.topic.topic_name}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Student:</span>{" "}
                {element.student.fname + " " + element.student.lname}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center col-span-full">
            No feedbacks for this batch and instructor
          </p>
        )}
      </div>
    </div>
  );
};

export default InstructorFeedback;
