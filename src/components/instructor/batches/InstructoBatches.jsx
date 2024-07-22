import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { batchesByInstructor } from "../../../redux/slices/batchSlice";

const InstructoBatches = () => {
  const instructorBatches = useSelector(
    (state) => state.batch.instructorBatches
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.split("/");
  const requiredPath = path[path.length - 1];

  useEffect(() => {
    dispatch(batchesByInstructor()).then((data) => {
      if (data.payload.success) {
        console.log("All batches of instructor are fetched");
      }
    });
  }, [dispatch]);

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-semibold mb-4">Instructor Batches</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instructorBatches.length > 0 ? (
          instructorBatches.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <h3 className="text-xl font-semibold mb-2">
                {element.batch_name}
              </h3>
              <p className="text-gray-700 mb-2">
                Start Time: {element.start_time}
              </p>
              <p className="text-gray-700 mb-2">End Time: {element.end_time}</p>
              {/* Show additional information like course here */}

              {requiredPath === "study" && (
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/instructor/batches/${element._id}/study`
                    )
                  }
                  className="btn border rounded-md py-2 px-4 mt-2 w-full"
                >
                  Access Study Material
                </button>
              )}

              {requiredPath === "attendance" && (
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/instructor/batches/${element._id}/students/attendance`
                    )
                  }
                  className="btn border rounded-md py-2 px-4 mt-2 w-full"
                >
                  Mark Attendance
                </button>
              )}

              {requiredPath === "batches" && (
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/instructor/batches/${element._id}/students`
                    )
                  }
                  className="btn border rounded-md py-2 px-4 mt-2 w-full"
                >
                  View Students
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No Batches are allocated</p>
        )}
      </div>
    </div>
  );
};

export default InstructoBatches;
