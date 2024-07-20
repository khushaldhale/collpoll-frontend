import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { batchesByInstructor } from "../../../redux/slices/batchSlice";

const InstructoBatches = () => {
  const instructorBatches = useSelector((state) => {
    return state.batch.instructorBatches;
  });

  const dispactch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.split("/");
  const requiredPath = path[path.length - 1];

  useEffect(() => {
    dispactch(batchesByInstructor()).then((data) => {
      if (data.payload.success) {
        console.log("all batches of instructor are fetched");
      }
    });
  }, []);
  return (
    <div>
      <div>
        {instructorBatches.length > 0 ? (
          instructorBatches.map((element) => {
            return (
              <div key={element._id}>
                <p>{element.batch_name}</p>
                <p>{element.start_time}</p>
                <p>{element.end_time}</p>
                {/* also have to show course and other information */}

                {requiredPath == "study" && (
                  <button
                    onClick={() => {
                      // send  route in which batch id u have to  mainatain. send id on the desired route
                      navigate(
                        `/dashboard/instructor/batches/${element._id}/study`
                      );
                    }}
                  >
                    Access Study Material
                  </button>
                )}

                {requiredPath == "attendance" && (
                  <button
                    onClick={() => {
                      // send  route in which batch id u have to  mainatain. send id on the desired route
                      navigate(
                        `/dashboard/instructor/batches/${element._id}/students/attendance`
                      );
                    }}
                  >
                    Mark Attendance
                  </button>
                )}

                {requiredPath == "batches" && (
                  <button
                    onClick={() => {
                      // send  route in which batch id u have to  mainatain. send id on the desired route
                      navigate(
                        `/dashboard/instructor/batches/${element._id}/students`
                      );
                    }}
                  >
                    View Students
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p>No Batches are allocated</p>
        )}
      </div>
    </div>
  );
};

export default InstructoBatches;
