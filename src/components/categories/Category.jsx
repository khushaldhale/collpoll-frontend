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
    <div className="category-container p-4 w-full">
      <div className="category-list bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold mb-6">Categories</h2>
        <div className="add-category flex justify-center mb-6">
          <button
            className="btn border rounded-md py-2 px-4 w-1/3 hover:bg-gray-200"
            onClick={() => navigate("/dashboard/admin/categories/add")}
          >
            Add Category
          </button>
        </div>
        {categories.length > 0 ? (
          categories.map((element) => (
            <div
              className="category-item bg-gray-100 p-6 mb-4 rounded-md shadow-sm w-full"
              key={element._id}
            >
              <h3 className="text-xl font-medium mb-2">
                {element.category_name}
              </h3>
              <p className="text-gray-700 mb-4">{element.category_desc}</p>
              <div className="button-group grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  className="btn border rounded-md py-2 px-4 bg-yellow-500 text-white  hover:bg-yellow-600"
                  onClick={() =>
                    navigate(
                      `/dashboard/admin/categories/${element._id}/update`
                    )
                  }
                >
                  Update Category
                </button>
                <button
                  className="btn border rounded-md py-2 px-4 bg-red-500 text-white  hover:bg-red-600"
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
                  className="btn border rounded-md py-2 px-4 bg-green-500 text-white  hover:bg-green-600"
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
