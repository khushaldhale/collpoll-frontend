import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory } from "../../redux/slices/categorySlice";
import { createSub } from "../../redux/slices/subjectSlice";

const AddSubject = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sub_name: "",
    sub_desc: "",
  });

  const navigate = useNavigate();

  const { categoryId, courseId } = useParams();

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

    dispatch(createSub(formData)).then((data) => {
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

export default AddSubject;
