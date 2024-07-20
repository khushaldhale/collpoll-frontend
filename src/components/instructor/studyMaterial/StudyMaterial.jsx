import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMaterial,
  studyMaterialByBatch,
} from "../../../redux/slices/studyMaterialSlice";
import { useNavigate, useParams } from "react-router-dom";

// fetch all study material for a batch, give button for deletion
// upload study material for that particular batch

const StudyMaterial = () => {
  const studyMaterials = useSelector((state) => {
    return state.studyMaterial.studyMaterials;
  });

  const dispatch = useDispatch();

  const { batchId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(studyMaterialByBatch({ batchId })).then((data) => {
      if (data.payload.success) {
        console.log("study materials are fetched", data.payload.data);
      }
    });
  }, []);
  return (
    <div>
      <div>
        {studyMaterials.length > 0 ? (
          studyMaterials.map((element) => {
            return (
              <div>
                {/* <img src={element.notes} alt="" /> */}
                {/*  we also have to show the course they got  notes for */}
                <p>{element.subjectId}</p> // working perfectly
                <button
                  onClick={() => {
                    dispatch(
                      deleteMaterial({ batchId, studyId: element._id })
                    ).then((data) => {
                      if (data.payload.success) {
                        console.log("notes are deleted succesgully");
                      }
                    });
                  }}
                >
                  Delete Notes
                </button>
              </div>
            );
          })
        ) : (
          <p> Notes are not uploaded yet </p>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            navigate(`/dashboard/instructor/batches/${batchId}/study/upload`);
          }}
        >
          Add Notes
        </button>
      </div>
    </div>
  );
};

export default StudyMaterial;
