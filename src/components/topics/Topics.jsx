import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTopic, topicBySub } from "../../redux/slices/topicSlice";

const Topics = () => {
  const topics = useSelector((state) => state.topic.topics);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, subjectId, courseId } = useParams();

  useEffect(() => {
    dispatch(topicBySub({ categoryId, subjectId, courseId })).then((data) => {
      if (data.payload.success) {
        console.log("Topics are here");
      }
    });
  }, [dispatch, categoryId, subjectId, courseId]);

  return (
    <div className="topics-container p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Topics</h2>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() =>
            navigate(
              `/dashboard/admin/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics/add`
            )
          }
          className="bg-blue-500 text-white border border-blue-500 rounded-lg py-2 px-4 hover:bg-blue-600 w-full max-w-xs text-center"
        >
          Add Topic
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {topics.length > 0 ? (
          topics.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
            >
              <p className="text-xl font-semibold text-center">
                {element.topic_name}
              </p>
              <p className="text-gray-700 text-center">{element.topic_desc}</p>
              <p className="text-gray-600 text-center">
                Duration: {element.duration}
              </p>

              <div className="flex flex-col space-y-4 mt-4">
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/admin/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics/${element._id}/update`
                    )
                  }
                  className="bg-blue-500 text-white border border-blue-500 rounded-lg py-2 px-4 w-full hover:bg-blue-600 text-center"
                >
                  Update Topic
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      deleteTopic({
                        categoryId,
                        courseId,
                        subjectId,
                        topicId: element._id,
                      })
                    ).then((data) => {
                      if (data.payload.success) {
                        console.log("Topic is deleted successfully");
                      }
                    })
                  }
                  className="bg-red-500 text-white border border-red-500 rounded-lg py-2 px-4 w-full hover:bg-red-600 text-center"
                >
                  Delete Topic
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center">No topics are created yet</p>
        )}
      </div>
    </div>
  );
};

export default Topics;
