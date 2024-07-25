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
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold mb-4 ">Labs</h2>
        <div className="flex justify-center mb-4">
          <button
            className="btn border rounded-md py-2 px-4 w-1/3 mb-4 hover:bg-gray-200"
            onClick={() => navigate("/dashboard/admin/labs/add")}
          >
            Add Lab
          </button>
        </div>
        <div className="flex flex-wrap gap-4 justify-start">
          {labs.length > 0 ? (
            labs.map((element) => (
              <div
                className="bg-gray-100 p-6 mx-2 rounded-md shadow-sm max-w-xs"
                key={element._id}
              >
                <p className="text-xl  text-center mb-2">
                  Lab No:{element.lab_no}
                </p>
                <div className="flex flex-col space-y-2">
                  <button
                    className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => {
                      dispatch(deleteLab({ labId: element._id })).then(
                        (data) => {
                          if (data.payload.success) {
                            console.log("Lab is deleted successfully");
                          }
                        }
                      );
                    }}
                  >
                    Delete Lab
                  </button>
                  <button
                    className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
            <p className="text-gray-600 text-center">No labs are created yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lab;
