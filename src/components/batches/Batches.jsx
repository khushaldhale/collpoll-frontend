import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { batchesByLab, deleteBatch } from "../../redux/slices/batchSlice";

const Batches = () => {
  const batches = useSelector((state) => state.batch.batches);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { labId } = useParams();

  useEffect(() => {
    dispatch(batchesByLab({ labId })).then((data) => {
      if (data.payload.success) {
        console.log("Batches are here");
      }
    });
  }, [dispatch, labId]);

  return (
    <div className="batches-container p-4 max-w-full">
      <div className="batches-list bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Batches</h2>
        <div className="add-batch flex justify-center">
          <button
            className="btn border rounded-md py-2 px-4"
            onClick={() =>
              navigate(`/dashboard/admin/labs/${labId}/batches/add`)
            }
          >
            Add Batch
          </button>
        </div>
        {batches.length > 0 ? (
          batches.map((element) => (
            <div
              className="batch-card bg-gray-100 p-4 mb-4 rounded-md shadow-sm"
              key={element._id}
            >
              <h3 className="text-xl font-medium">{element.batch_name}</h3>
              <p className="text-gray-700">Start Time: {element.start_time}</p>
              <p className="text-gray-700">End Time: {element.end_time}</p>
              {/* Additional batch details can be added here */}
              <div className="button-group flex flex-col space-y-2">
                <button
                  className="btn border rounded-md py-2 px-4"
                  onClick={() =>
                    navigate(
                      `/dashboard/admin/labs/${labId}/batches/${element._id}/update`
                    )
                  }
                >
                  Update Batch
                </button>
                <button
                  className="btn border rounded-md py-2 px-4"
                  onClick={() =>
                    dispatch(deleteBatch({ labId, batchId: element._id }))
                  }
                >
                  Delete Batch
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No batches created in this lab</p>
        )}
      </div>
    </div>
  );
};

export default Batches;
