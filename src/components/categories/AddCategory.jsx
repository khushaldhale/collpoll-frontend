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

  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    dispatch(createCategory(formData)).then((data) => {
      if (data.payload.success) {
        navigate("/dashboard/admin/categories");
      }
    });
  }

  return (
    <div className="add-category-container p-4 max-w-full">
      <div className="form-container bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
        <form
          method="post"
          onSubmit={submitHandler}
          className="flex flex-col space-y-4"
        >
          <input
            type="text"
            name="category_name"
            placeholder="Category Name"
            onChange={changeHandler}
            value={formData.category_name}
            className="border rounded-md py-2 px-4"
          />
          <input
            type="text"
            name="category_desc"
            onChange={changeHandler}
            placeholder="Category Description"
            value={formData.category_desc}
            className="border rounded-md py-2 px-4"
          />
          <button
            type="submit"
            className="btn border rounded-md py-2 px-4 w-1/3 mx-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
