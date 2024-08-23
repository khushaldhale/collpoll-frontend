import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../redux/slices/categorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    category_name: "",
    category_desc: "",
  });

  const [errors, setErrors] = useState({
    category_name: "",
    category_desc: "",
  });

  const navigate = useNavigate();

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

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    const newErrors = {
      category_name: validateField("category_name", formData.category_name),
      category_desc: validateField("category_desc", formData.category_desc),
    };
    setErrors(newErrors);

    if (!newErrors.category_name && !newErrors.category_desc) {
      dispatch(createCategory(formData)).then((data) => {
        if (data.payload.success) {
          navigate("/dashboard/admin/categories");
        }
      });
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add Category</h2>
      <form
        method="post"
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="flex flex-col">
          <label htmlFor="category_name" className="text-sm font-medium mb-1">
            Category Name
          </label>
          <input
            type="text"
            id="category_name"
            name="category_name"
            placeholder="Category Name"
            onChange={changeHandler}
            value={formData.category_name}
            className="border border-gray-300 rounded-lg p-2"
          />
          {errors.category_name && (
            <p className="text-red-500 text-sm mt-1">{errors.category_name}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="category_desc" className="text-sm font-medium mb-1">
            Category Description
          </label>
          <input
            type="text"
            id="category_desc"
            name="category_desc"
            placeholder="Category Description"
            onChange={changeHandler}
            value={formData.category_desc}
            className="border border-gray-300 rounded-lg p-2"
          />
          {errors.category_desc && (
            <p className="text-red-500 text-sm mt-1">{errors.category_desc}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
