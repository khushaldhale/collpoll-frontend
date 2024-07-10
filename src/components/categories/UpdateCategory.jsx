import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleCategory,
  updateCategory,
} from "../../redux/slices/categorySlice";

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    category_name: "",
    category_desc: "",
  });

  const params = useParams();
  const id = params.categoryId;

  useEffect(() => {
    dispatch(getSingleCategory(id)).then((data) => {
      setFormData({
        category_name: data.payload.data.category_name,
        category_desc: data.payload.data.category_desc,
      });
    });
  }, []);

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

    formData.id = id;
    dispatch(updateCategory(formData)).then((data) => {
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
          placeholder="category desc"
          onChange={changeHandler}
          value={formData.category_desc}
        />

        <button type="submit"> submit </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
