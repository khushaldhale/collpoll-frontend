import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { particularTopic, updateTopic } from "../../redux/slices/topicSlice";

const UpdateTopic = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    topic_name: "",
    topic_desc: "",
    duration: undefined,
  });

  const navigate = useNavigate();

  const { categoryId, courseId, subjectId, topicId } = useParams();

  useEffect(() => {
    dispatch(particularTopic({ topicId })).then((data) => {
      console.log("topics is ", data.payload.data);
      if (data.payload.success) {
        setFormData({
          topic_name: data.payload.data.topic_name,
          topic_desc: data.payload.data.topic_desc,
          duration: data.payload.data.duration,
        });
      }
    });
  }, []);

  function changeHandler(event) {
    console.log(event.target.name, " : ", event.target.value);
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
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
    <div>
      <form method="post" onSubmit={submitHandler}>
        <input
          type="text"
          name="topic_name"
          placeholder="topic name"
          onChange={changeHandler}
          value={formData.topic_name}
        />
        <input
          type="text"
          name="topic_desc"
          onChange={changeHandler}
          placeholder="topic desc"
          value={formData.topic_desc}
        />
        <input
          type="number"
          name="duration"
          onChange={changeHandler}
          placeholder="topic duration"
          value={formData.duration}
        />

        <button type="submit"> Create Topic </button>
      </form>
    </div>
  );
};

export default UpdateTopic;
