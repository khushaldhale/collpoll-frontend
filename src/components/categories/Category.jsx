import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategories,
} from "../../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import "./Category.css";

const Category = () => {
  const categories = useSelector((state) => state.category.categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="cat-container">
      <div className="sec-1">
        {categories.length > 0 ? (
          categories.map((element) => (
            <div className="category" key={element._id}>
              <p>{element.category_name}</p>
              <p>{element.category_desc}</p>
              <button
                onClick={() => {
                  navigate(`/dashboard/admin/categories/${element._id}/update`);
                }}
              >
                Update Category
              </button>
              <button
                onClick={() => {
                  dispatch(deleteCategory({ _id: element._id })).then(
                    (data) => {
                      if (data.payload.success) {
                        console.log("deleted successfully");
                      }
                    }
                  );
                }}
              >
                Delete Category
              </button>
              <button
                onClick={() => {
                  navigate(
                    `/dashboard/admin/categories/${element._id}/courses`
                  );
                }}
              >
                View All Courses
              </button>
            </div>
          ))
        ) : (
          <p>No categories are added yet</p>
        )}
      </div>

      <div className="sec-2">
        <button
          onClick={() => {
            navigate("/dashboard/admin/categories/add");
          }}
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default Category;
