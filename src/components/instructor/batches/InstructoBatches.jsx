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

      <div className="flex flex-wrap gap-4">
        {instructorBatches.length > 0 ? (
          instructorBatches.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 lg:w-1/4"
            >
              <h3 className="text-xl font-semibold mb-2">
                {element.batch_name}
              </h3>
              <p className="text-gray-700 mb-2">
                Start Time: {element.start_time.split("T")[0]}
              </p>
              <p className="text-gray-700 mb-2">
                End Time: {element.end_time.split("T")[0]}
              </p>

              {requiredPath === "study" && (
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/instructor/batches/${element._id}/study`
                    )
                  }
                  className="bg-blue-500 text-white rounded-md py-2 px-4 mt-2 w-full hover:bg-blue-600 transition duration-300"
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
                  className="bg-blue-500 text-white rounded-md py-2 px-4 mt-2 w-full hover:bg-blue-600 transition duration-300"
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
                  className="bg-blue-500 text-white rounded-md py-2 px-4 mt-2 w-full hover:bg-blue-600 transition duration-300"
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
