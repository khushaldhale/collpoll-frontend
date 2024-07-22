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
  }, [courseId, dispatch]);

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

    dispatch(updateCourse(formData)).then((data) => {
      if (data.payload.success) {
        navigate(-1);
      }
    });
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-xl font-bold mb-4">Update Course</h2>
      <form method="post" onSubmit={submitHandler} className="space-y-4">
        <div>
          <label
            htmlFor="course_name"
            className="block text-sm font-medium mb-1"
          >
            Course Name
          </label>
          <input
            type="text"
            name="course_name"
            id="course_name"
            placeholder="Course Name"
            onChange={changeHandler}
            value={formData.course_name}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="course_desc"
            className="block text-sm font-medium mb-1"
          >
            Course Description
          </label>
          <input
            type="text"
            name="course_desc"
            id="course_desc"
            placeholder="Course Description"
            onChange={changeHandler}
            value={formData.course_desc}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="course_price"
            className="block text-sm font-medium mb-1"
          >
            Course Price
          </label>
          <input
            type="number"
            name="course_price"
            id="course_price"
            placeholder="Course Price"
            onChange={changeHandler}
            value={formData.course_price}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isInstallment"
            id="isInstallment"
            onChange={changeHandler}
            checked={formData.isInstallment}
            className="mr-2"
          />
          <label htmlFor="isInstallment" className="text-sm font-medium">
            Installment
          </label>
        </div>
        {formData.isInstallment && (
          <div>
            <label
              htmlFor="installment_desc"
              className="block text-sm font-medium mb-1"
            >
              Installment Description
            </label>
            <input
              type="text"
              name="installment_desc"
              id="installment_desc"
              placeholder="Installment Description"
              onChange={changeHandler}
              value={formData.installment_desc}
              className="w-full p-2 border rounded-md"
            />
          </div>
        )}
        <button type="submit" className="w-full p-2 border rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
