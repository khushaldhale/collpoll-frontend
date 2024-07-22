import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentInfo } from "../../redux/slices/studentSlice";
import { studyMaterialByBatch } from "../../redux/slices/studyMaterialSlice";

const StudentStudyMaterial = () => {
  const studyMaterials = useSelector(
    (state) => state.studyMaterial.studyMaterials
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(studentInfo()).then((data) => {
      if (data.payload.success) {
        dispatch(
          studyMaterialByBatch({
            batchId: data.payload.data.batch_allocated._id,
          })
        ).then((data) => {
          if (data.payload.success) {
            console.log("Study materials are fetched", data.payload.data);
          }
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Study Materials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyMaterials.length > 0 ? (
          studyMaterials.map((material) => (
            <div
              key={material._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
            >
              <p className="text-lg font-semibold">
                Subject: {material.subjectId.sub_name}
              </p>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = material.notes;
                  link.target = "_blank";
                  link.download = `${material.subjectId.sub_name}.pdf`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="border rounded-lg py-2 px-4 hover:bg-gray-200"
              >
                Download PDF
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center col-span-full">
            Notes are not uploaded yet
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentStudyMaterial;
