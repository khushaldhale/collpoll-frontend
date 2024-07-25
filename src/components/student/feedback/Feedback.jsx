import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  notSubmittedFeedback,
  submitFeedback,
} from "../../../redux/slices/feedbackSlice";

const Feedback = () => {
  const not_submitted_feedback = useSelector(
    (state) => state.feedback.feedback_not_submitted
  );

  const [formData, setFormData] = useState({
    rating: undefined,
    reviews: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(notSubmittedFeedback()).then((data) => {
      if (data.payload.success) {
        console.log("All not submitted feedbacks are fetched");
      }
    });
  }, [dispatch]);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (event, feedbackId) => {
    event.preventDefault();
    dispatch(submitFeedback({ ...formData, feedbackId })).then((data) => {
      if (data.payload.success) {
        console.log("Feedback is submitted successfully");
      }
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Feedbacks</h2>
      {not_submitted_feedback.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {not_submitted_feedback.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
            >
              <form
                method="post"
                onSubmit={(event) => submitHandler(event, element._id)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={element.subject.sub_name}
                    className="block w-full text-lg text-gray-700 border border-gray-300 rounded-md shadow-sm p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={element.topic.topic_name}
                    className="block w-full text-lg text-gray-700 border border-gray-300 rounded-md shadow-sm p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructor Name
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`${element.instructor.fname} ${element.instructor.lname}`}
                    className="block w-full text-lg text-gray-700 border border-gray-300 rounded-md shadow-sm p-3"
                  />
                </div>
                <input
                  type="number"
                  max={10}
                  name="rating"
                  id="rating"
                  placeholder="Enter Ratings"
                  onChange={changeHandler}
                  className="block w-full text-lg text-gray-700 border border-gray-300 rounded-md shadow-sm p-3"
                />
                <input
                  type="text"
                  name="reviews"
                  id="reviews"
                  placeholder="Enter Reviews"
                  onChange={changeHandler}
                  className="block w-full text-lg text-gray-700 border border-gray-300 rounded-md shadow-sm p-3"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center">No feedbacks remaining</p>
      )}
    </div>
  );
};

export default Feedback;
