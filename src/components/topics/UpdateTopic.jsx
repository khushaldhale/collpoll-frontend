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

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    formData.categoryId = categoryId;
    formData.courseId = courseId;
    formData.subjectId = subjectId;
    formData.topicId = topicId;

    dispatch(updateTopic(formData)).then((data) => {
      if (data.payload.success) {
        navigate(-1);
      }
    });
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Topic</h2>
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-lg p-6"
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
            value={formData.topic_name}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
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
            value={formData.topic_desc}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
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
            value={formData.duration}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
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
