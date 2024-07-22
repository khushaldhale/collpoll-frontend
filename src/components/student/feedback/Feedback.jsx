import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  notSubmittedFeedback,
  submitFeedback,
} from "../../../redux/slices/feedbackSlice";

const Feedback = () => {
  const not_submitted_feedback = useSelector((state) => {
    return state.feedback.feedback_not_submitted;
  });

  const [formData, setFormData] = useState({
    rating: undefined,
    reviews: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(notSubmittedFeedback()).then((data) => {
      console.log(data);
      if (data.payload.success) {
        console.log("all not submitted feedbacks are fetched");
      }
    });
  }, []);

  function changeHandler(event) {
    const { type, name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }
  function submitHandler(event, feedbackId) {
    event.preventDefault();
    formData.feedbackId = feedbackId;
    dispatch(submitFeedback(formData)).then((data) => {
      if (data.payload.success) {
        console.log("feedback is submitted succesfuly");
      }
    });
  }

  return (
    <div>
      <p>Feedbacks</p>
      {not_submitted_feedback.length > 0 ? (
        not_submitted_feedback.map((element) => {
          return (
            <div>
              <form
                method="post"
                onSubmit={(event) => {
                  submitHandler(event, element._id);
                }}
              >
                <input type="text" readOnly value={element.subject.sub_name} />
                <input type="text" readOnly value={element.topic.topic_name} />
                <input
                  type="text"
                  readOnly
                  value={
                    element.instructor.fname + " " + element.instructor.lname
                  }
                />
                <input
                  type="number"
                  max={10}
                  name="rating"
                  id="rating"
                  placeholder="Enter Ratings"
                  onChange={changeHandler}
                />
                <input
                  type="text"
                  name="reviews"
                  id="reviews"
                  placeholder="Enter Reviews"
                  onChange={changeHandler}
                />

                <button type="submit"> Submit Feedback</button>
              </form>
            </div>
          );
        })
      ) : (
        <p> No feedbacks remained</p>
      )}
    </div>
  );
};

export default Feedback;
