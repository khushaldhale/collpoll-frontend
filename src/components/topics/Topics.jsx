import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTopic, topicBySub } from "../../redux/slices/topicSlice";
import "./Topics.css";

const Topics = () => {
  const topics = useSelector((state) => {
    return state.topic.topics;
  }, []);

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
    <div className="topics-container">
      <div className="topics-list">
        {topics.length > 0 ? (
          topics.map((element) => {
            return (
              <div className="topics-card" key={element._id}>
                <p>{element.topic_name}</p>
                <p>{element.topic_desc}</p>
                <p>{element.duration}</p>
                <button
                  onClick={() => {
                    navigate(
                      `/dashboard/admin/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics/${element._id}/update`
                    );
                  }}
                >
                  Update Topic
                </button>
                <button
                  onClick={() => {
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
                    });
                  }}
                >
                  Delete Topic
                </button>
              </div>
            );
          })
        ) : (
          <p>No topics are created yet</p>
        )}
      </div>
      <div className="add-topic">
        <button
          onClick={() => {
            navigate(
              `/dashboard/admin/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics/add`
            );
          }}
        >
          Add Topic
        </button>
      </div>
    </div>
  );
};

export default Topics;
