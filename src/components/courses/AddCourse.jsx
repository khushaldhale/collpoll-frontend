import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCourse } from "../../redux/slices/courseSlice";

const AddCourse = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    course_name: "",
    course_desc: "",
    course_price: undefined,
    isInstallment: false,
    installment_desc: "",
  });

  const { categoryId } = useParams();
  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((prevData) => {
      const { name, checked, type, value } = event.target;
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  function submitHandler(event) {
    event.preventDefault();
    formData.categoryId = categoryId;

    dispatch(createCourse(formData)).then((data) => {
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
          name="course_name"
          placeholder="course name"
          onChange={changeHandler}
          value={formData.course_name}
        />
        <input
          type="text"
          name="course_desc"
          onChange={changeHandler}
          placeholder="course desc"
          value={formData.course_desc}
        />

        <input
          type="number"
          name="course_price"
          onChange={changeHandler}
          placeholder="course price"
          value={formData.course_price}
        />

        <label htmlFor="isInstallment"> Installment </label>
        <input
          type="checkbox"
          name="isInstallment"
          id="isInstallment"
          onChange={changeHandler}
          checked={formData.isInstallment}
        />
        <input
          type="text"
          name="installment_desc"
          onChange={changeHandler}
          placeholder="installment desc"
          value={formData.installment_desc}
        />

        <button type="submit"> submit </button>
      </form>
    </div>
  );
};

export default AddCourse;
