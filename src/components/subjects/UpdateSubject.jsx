import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { particularSub, updateSub } from "../../redux/slices/subjectSlice";

const UpdateSubject = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sub_name: "",
    sub_desc: "",
  });

  const navigate = useNavigate();

  const { categoryId, courseId, subjectId } = useParams();

  useEffect(() => {
    dispatch(particularSub({ subjectId })).then((data) => {
      console.log("sub data is fetched ", data.payload.data);
      if (data.payload.success) {
        setFormData({
          sub_name: data.payload.data.sub_name,
          sub_desc: data.payload.data.sub_desc,
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

    dispatch(updateSub(formData)).then((data) => {
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
          name="sub_name"
          placeholder="subject name"
          onChange={changeHandler}
          value={formData.sub_name}
        />
        <input
          type="text"
          name="sub_desc"
          onChange={changeHandler}
          placeholder="subject desc"
          value={formData.sub_desc}
        />

        <button type="submit"> Create Sub </button>
      </form>
    </div>
  );
};

export default UpdateSubject;
