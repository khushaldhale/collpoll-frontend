import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCourse, particularCourse } from "../../redux/slices/courseSlice";

const UpdateCourse = () => {
  const dispatch = useDispatch();
  const { categoryId, courseId } = useParams();
  const [formData, setFormData] = useState({
    course_name: "",
    course_desc: "",
    course_price: undefined,
    isInstallment: false,
    installment_desc: "",
  });

  useEffect(() => {
    dispatch(particularCourse({ courseId })).then((data) => {
      if (data.payload.success) {
        setFormData({
          course_name: data.payload.data.course_name,
          course_desc: data.payload.data.course_desc,
          course_price: data.payload.data.course_price,
          isInstallment: data.payload.data.isInstallment,
          installment_desc: data.payload.data.installment_desc,
        });
      }
    });
  }, []);

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
    formData.courseId = courseId;

    console.log(formData);

    dispatch(updateCourse(formData)).then((data) => {
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

export default UpdateCourse;
