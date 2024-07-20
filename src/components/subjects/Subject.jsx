import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSub, subByCategory } from "../../redux/slices/subjectSlice";

const Subject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, courseId } = useParams();

  const subjects = useSelector((state) => state.subject.subjects);

  useEffect(() => {
    dispatch(subByCategory({ categoryId, courseId })).then((data) => {
      if (data.payload.success) {
        console.log("All subs are fetched");
      }
    });
  }, [dispatch, categoryId, courseId]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Subjects</h2>
      <div className="mt-6 flex justify-center mb-4">
        <button
          onClick={() =>
            navigate(
              `/dashboard/admin/categories/${categoryId}/courses/${courseId}/sub/add`
            )
          }
          className="border rounded-lg py-2 px-4 hover:bg-gray-200"
        >
          Add Subject
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.length > 0 ? (
          subjects.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
            >
              <h3 className="text-xl font-semibold">{element.sub_name}</h3>
              <p className="text-gray-700">{element.sub_desc}</p>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/admin/categories/${categoryId}/courses/${courseId}/sub/${element._id}/update`
                    )
                  }
                  className="border rounded-lg py-2 px-4 w-full hover:bg-gray-200 text-center"
                >
                  Update Sub
                </button>
                <button
                  onClick={() => {
                    dispatch(
                      deleteSub({
                        categoryId,
                        courseId,
                        subjectId: element._id,
                      })
                    ).then((data) => {
                      if (data.payload.success) {
                        console.log("Sub is deleted successfully");
                      }
                    });
                  }}
                  className="border rounded-lg py-2 px-4 w-full hover:bg-gray-200 text-center"
                >
                  Delete Sub
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/admin/categories/${categoryId}/courses/${courseId}/sub/${element._id}/topics`
                    )
                  }
                  className="border rounded-lg py-2 px-4 w-full hover:bg-gray-200 text-center"
                >
                  View All Topics
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No subjects created</p>
        )}
      </div>
    </div>
  );
};

export default Subject;
