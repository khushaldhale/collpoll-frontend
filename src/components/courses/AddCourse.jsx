import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCourse } from "../../redux/slices/courseSlice";

const AddCourse = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    course_name: "",
    course_desc: "",
    course_price: "",
    isInstallment: false,
    installment_desc: "",
  });

  const { categoryId } = useParams();
  const navigate = useNavigate();

  function changeHandler(event) {
    const { name, checked, type, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Course</h2>
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="flex flex-col">
          <label htmlFor="course_name" className="text-sm font-medium mb-1">
            Course Name
          </label>
          <input
            type="text"
            id="course_name"
            name="course_name"
            placeholder="Enter course name"
            onChange={changeHandler}
            value={formData.course_name}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="course_desc" className="text-sm font-medium mb-1">
            Course Description
          </label>
          <input
            type="text"
            id="course_desc"
            name="course_desc"
            placeholder="Enter course description"
            onChange={changeHandler}
            value={formData.course_desc}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="course_price" className="text-sm font-medium mb-1">
            Course Price
          </label>
          <input
            type="number"
            id="course_price"
            name="course_price"
            placeholder="Enter course price"
            onChange={changeHandler}
            value={formData.course_price}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isInstallment"
            name="isInstallment"
            onChange={changeHandler}
            checked={formData.isInstallment}
            className="h-4 w-4"
          />
          <label htmlFor="isInstallment" className="text-sm font-medium">
            Installment
          </label>
        </div>

        {formData.isInstallment && (
          <div className="flex flex-col">
            <label
              htmlFor="installment_desc"
              className="text-sm font-medium mb-1"
            >
              Installment Description
            </label>
            <input
              type="text"
              id="installment_desc"
              name="installment_desc"
              placeholder="Enter installment description"
              onChange={changeHandler}
              value={formData.installment_desc}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
