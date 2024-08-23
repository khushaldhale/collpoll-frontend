import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { particularTopic, updateTopic } from "../../redux/slices/topicSlice";

const UpdateTopic = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    topic_name: "",
    topic_desc: "",
    duration: "",
  });

  const [errors, setErrors] = useState({
    topic_name: "",
    topic_desc: "",
    duration: "",
  });

  const navigate = useNavigate();
  const { categoryId, courseId, subjectId, topicId } = useParams();

  useEffect(() => {
    dispatch(particularTopic({ topicId })).then((data) => {
      if (data.payload.success) {
        setFormData({
          topic_name: data.payload.data.topic_name,
          topic_desc: data.payload.data.topic_desc,
          duration: data.payload.data.duration,
        });
      }
    });
  }, [dispatch, topicId]);

  function validateField(name, value) {
    let error = "";
    if (value.trim() === "") {
      error = `${name.replace("_", " ")} is required`;
    } else if (name === "duration" && isNaN(value)) {
      error = "Duration must be a number";
    }
    return error;
  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate field on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    // Validate field on blur
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    // Validate all fields before submission
    const newErrors = {
      topic_name: validateField("topic_name", formData.topic_name),
      topic_desc: validateField("topic_desc", formData.topic_desc),
      duration: validateField("duration", formData.duration),
    };
    setErrors(newErrors);

    // Check if there are no errors before dispatching
    if (!newErrors.topic_name && !newErrors.topic_desc && !newErrors.duration) {
      const data = {
        ...formData,
        categoryId,
        courseId,
        subjectId,
        topicId,
      };

      dispatch(updateTopic(data)).then((data) => {
        if (data.payload.success) {
          navigate(-1);
        }
      });
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Topic</h2>
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="mb-4">
          <label
            htmlFor="topic_name"
            className="block text-sm font-medium text-gray-700"
          >
            Topic Name
          </label>
          <input
            id="topic_name"
            type="text"
            name="topic_name"
            placeholder="Enter topic name"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.topic_name}
            className="w-full border rounded-lg p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.topic_name && (
            <p className="text-red-500 text-sm mt-1">{errors.topic_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="topic_desc"
            className="block text-sm font-medium text-gray-700"
          >
            Topic Description
          </label>
          <input
            id="topic_desc"
            type="text"
            name="topic_desc"
            placeholder="Enter topic description"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.topic_desc}
            className="w-full border rounded-lg p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.topic_desc && (
            <p className="text-red-500 text-sm mt-1">{errors.topic_desc}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700"
          >
            Duration (in minutes)
          </label>
          <input
            id="duration"
            type="number"
            name="duration"
            placeholder="Enter duration"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.duration}
            className="w-full border rounded-lg p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Topic
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTopic;
