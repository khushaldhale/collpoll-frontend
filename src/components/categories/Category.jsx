import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategories,
} from "../../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const categories = useSelector((state) => state.category.categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="category-container p-4 max-w-full">
      <div className="category-list bg-white shadow-md rounded-lg p-6 mb-4 ">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="add-category flex justify-center mb-3">
          <button
            className="btn border rounded-md py-2 px-4 w-1/3"
            onClick={() => navigate("/dashboard/admin/categories/add")}
          >
            Add Category
          </button>
        </div>
        {categories.length > 0 ? (
          categories.map((element) => (
            <div
              className="category-item bg-gray-100 p-4 mb-4 rounded-md shadow-sm"
              key={element._id}
            >
              <h3 className="text-xl font-medium">{element.category_name}</h3>
              <p className="text-gray-700 mb-4">{element.category_desc}</p>
              <div className="button-group flex flex-col space-y-2">
                <button
                  className="btn border rounded-md py-2 px-4 w-1/3 mx-auto"
                  onClick={() =>
                    navigate(
                      `/dashboard/admin/categories/${element._id}/update`
                    )
                  }
                >
                  Update Category
                </button>
                <button
                  className="btn border rounded-md py-2 px-4 w-1/3 mx-auto"
                  onClick={() => {
                    dispatch(deleteCategory({ _id: element._id })).then(
                      (data) => {
                        if (data.payload.success) {
                          console.log("Deleted successfully");
                        }
                      }
                    );
                  }}
                >
                  Delete Category
                </button>
                <button
                  className="btn border rounded-md py-2 px-4 w-1/3 mx-auto"
                  onClick={() =>
                    navigate(
                      `/dashboard/admin/categories/${element._id}/courses`
                    )
                  }
                >
                  View All Courses
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No categories are added yet</p>
        )}
      </div>
    </div>
  );
};

export default Category;
