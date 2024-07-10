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

    dispatch(createCategory(formData)).then((data) => {
      if (data.payload.success) {
        navigate("/dashboard/admin/categories");
      }
    });
  }

  return (
    <div>
      <form method="post" onSubmit={submitHandler}>
        <input
          type="text"
          name="category_name"
          placeholder="category name"
          onChange={changeHandler}
          value={formData.category_name}
        />
        <input
          type="text"
          name="category_desc"
          onChange={changeHandler}
          placeholder="category desc"
          value={formData.category_desc}
        />

        <button type="submit"> submit </button>
      </form>
    </div>
  );
};

export default AddCategory;
