import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSub, subByCategory } from "../../redux/slices/subjectSlice";

const Subject = () => {
  const subjects = useSelector((state) => {
    console.log("Current state:", state); // Debugging line
    return state.subject.subjects;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, courseId } = useParams();

  useEffect(() => {
    dispatch(subByCategory({ categoryId, courseId })).then((data) => {
      if (data.payload.success) {
        console.log("All subs are fetched");
      }
    });
  }, [dispatch, categoryId, courseId]);

  return (
    <div className="subject-container">
      <div className="subject-list">
        {subjects.length > 0 ? (
          subjects.map((element) => {
            return (
              <div className="subject-card" key={element._id}>
                <p>{element.sub_name}</p>
                <p>{element.sub_desc}</p>
                <button
                  onClick={() => {
                    navigate(
                      `/dashboard/admin/categories/${categoryId}/courses/${courseId}/sub/${element._id}/update`
                    );
                  }}
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
                >
                  Delete Sub
                </button>

                <button
                  onClick={() => {
                    navigate(
                      `/dashboard/admin/categories/${categoryId}/courses/${courseId}/sub/${element._id}/topics`
                    );
                  }}
                >
                  View All Topics
                </button>
              </div>
            );
          })
        ) : (
          <p>No subjects created</p>
        )}
      </div>
      <div className="add-subject">
        <button
          onClick={() => {
            navigate(
              `/dashboard/admin/categories/${categoryId}/courses/${courseId}/sub/add`
            );
          }}
        >
          Add Subject
        </button>
      </div>
    </div>
  );
};

export default Subject;
