import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLab } from "../../redux/slices/labSlice";

const AddLab = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    lab_no: "",
  });

  const [errors, setErrors] = useState({
    lab_no: "",
  });

  const navigate = useNavigate();

  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "lab_no") {
      if (!value) {
        error = "Lab number is required";
      } else if (value <= 0) {
        error = "Lab number must be greater than zero";
      }
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let valid = true;
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} is required`;
        valid = false;
      } else {
        validateField(key, formData[key]);
        if (errors[key]) valid = false;
      }
    });
    setErrors(newErrors);
    if (valid) {
      dispatch(createLab(formData)).then((data) => {
        if (data.payload.success) {
          navigate("/dashboard/admin/labs");
        }
      });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add New Lab</h2>
        <form onSubmit={submitHandler} className="flex flex-col space-y-4">
          <div className="mb-4">
            <label
              htmlFor="lab_no"
              className="block text-sm font-medium text-gray-700"
            >
              Lab Number
            </label>
            <input
              id="lab_no"
              type="number"
              name="lab_no"
              placeholder="Enter lab number"
              onChange={changeHandler}
              onBlur={handleBlur}
              value={formData.lab_no}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.lab_no && (
              <span className="text-red-500 text-sm">{errors.lab_no}</span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Lab
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLab;
