import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMaterial,
  studyMaterialByBatch,
} from "../../../redux/slices/studyMaterialSlice";
import { useNavigate, useParams } from "react-router-dom";

const StudyMaterial = () => {
  const studyMaterials = useSelector(
    (state) => state.studyMaterial.studyMaterials
  );

  const dispatch = useDispatch();
  const { batchId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(studyMaterialByBatch({ batchId })).then((data) => {
      if (data.payload.success) {
        console.log("Study materials are fetched", data.payload.data);
      }
    });
  }, [dispatch, batchId]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Study Materials</h2>

      <div className="mb-6">
        {studyMaterials.length > 0 ? (
          studyMaterials.map((material) => (
            <div
              key={material._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div className="mb-4 md:mb-0">
                {/* Uncomment below line if you want to show the image */}
                {/* <img src={material.notes} alt="Study Material" className="w-full md:w-48 h-auto mb-4 rounded-md shadow-sm" /> */}
                <p className="text-lg font-medium text-gray-800 mb-2">
                  Subject: {material.subjectId}
                </p>
                {/* Show more information if needed */}
              </div>
              <button
                onClick={() => {
                  dispatch(
                    deleteMaterial({ batchId, studyId: material._id })
                  ).then((data) => {
                    if (data.payload.success) {
                      console.log("Notes are deleted successfully");
                    }
                  });
                }}
                className="btn border rounded-md py-2 px-4 bg-red-500 text-white hover:bg-red-600"
              >
                Delete Notes
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Notes are not uploaded yet</p>
        )}
      </div>

      <div>
        <button
          onClick={() => {
            navigate(`/dashboard/instructor/batches/${batchId}/study/upload`);
          }}
          className="btn border rounded-md py-2 px-4 bg-blue-500 text-white hover:bg-blue-600"
        >
          Add Notes
        </button>
      </div>
    </div>
  );
};

export default StudyMaterial;
