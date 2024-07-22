import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteLab, getAllLabs } from "../../redux/slices/labSlice";

const Lab = () => {
  const labs = useSelector((state) => state.lab.labs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllLabs()).then((data) => {
      if (data.payload.success) {
        console.log("Labs are fetched successfully");
      }
    });
  }, [dispatch]);

  return (
    <div className="lab-container p-4 max-w-full">
      <div className="lab-list bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Labs</h2>
        <div className="add-lab flex justify-center mb-4">
          <button
            className="btn border rounded-md py-2 px-4 w-1/3 md:w-auto"
            onClick={() => navigate("/dashboard/admin/labs/add")}
          >
            Add Lab
          </button>
        </div>
        {labs.length > 0 ? (
          labs.map((element) => (
            <div
              className="lab-card bg-gray-100 p-4 mb-4 rounded-md shadow-sm"
              key={element._id}
            >
              <p className="text-xl font-medium">{element.lab_no}</p>
              <div className="button-group flex flex-col space-y-2 mt-4">
                <button
                  className="btn border rounded-md py-2 px-4"
                  onClick={() => {
                    dispatch(deleteLab({ labId: element._id })).then((data) => {
                      if (data.payload.success) {
                        console.log("Lab is deleted successfully");
                      }
                    });
                  }}
                >
                  Delete Lab
                </button>
                <button
                  className="btn border rounded-md py-2 px-4"
                  onClick={() => {
                    navigate(`/dashboard/admin/labs/${element._id}/batches`);
                  }}
                >
                  Show Batches
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No labs are created yet</p>
        )}
      </div>
    </div>
  );
};

export default Lab;
