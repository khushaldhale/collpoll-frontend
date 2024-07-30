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

  const [errors, setErrors] = useState({
    sub_name: "",
    sub_desc: "",
  });

  const navigate = useNavigate();
  const { categoryId, courseId, subjectId } = useParams();

  useEffect(() => {
    dispatch(particularSub({ subjectId })).then((data) => {
      if (data.payload.success) {
        setFormData({
          sub_name: data.payload.data.sub_name,
          sub_desc: data.payload.data.sub_desc,
        });
      }
    });
  }, [dispatch, subjectId]);

  function validateField(name, value) {
    let error = "";
    if (value.trim() === "") {
      error = `${name.replace("_", " ")} is required`;
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
      sub_name: validateField("sub_name", formData.sub_name),
      sub_desc: validateField("sub_desc", formData.sub_desc),
    };
    setErrors(newErrors);

    // Check if there are no errors before dispatching
    if (!newErrors.sub_name && !newErrors.sub_desc) {
      const data = {
        ...formData,
        categoryId,
        courseId,
        subjectId,
      };

      dispatch(updateSub(data)).then((data) => {
        if (data.payload.success) {
          navigate(-1);
        }
      });
    }
  }

  return (
    <div className="update-subject-container p-4 max-w-lg mx-auto">
      <div className="form-container bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Subject
        </h2>
        <form onSubmit={submitHandler} className="flex flex-col space-y-4">
          <div className="mb-4">
            <label
              htmlFor="sub_name"
              className="block text-sm font-medium text-gray-700"
            >
              Subject Name
            </label>
            <input
              id="sub_name"
              type="text"
              name="sub_name"
              placeholder="Enter subject name"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.sub_name}
              className="w-full border rounded-lg p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.sub_name && (
              <p className="text-red-500 text-sm mt-1">{errors.sub_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="sub_desc"
              className="block text-sm font-medium text-gray-700"
            >
              Subject Description
            </label>
            <input
              id="sub_desc"
              type="text"
              name="sub_desc"
              placeholder="Enter subject description"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.sub_desc}
              className="w-full border rounded-lg p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.sub_desc && (
              <p className="text-red-500 text-sm mt-1">{errors.sub_desc}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubject;
