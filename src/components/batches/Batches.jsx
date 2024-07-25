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
        console.log(data.payload.data);
        console.log("Batches are here");
      }
    });
  }, [dispatch, labId]);

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Batches</h2>
        <div className="flex justify-center mb-4">
          <button
            className="btn border rounded-md py-2 px-4 w-1/3 mb-6 hover:bg-gray-200"
            onClick={() =>
              navigate(`/dashboard/admin/labs/${labId}/batches/add`)
            }
          >
            Add Batch
          </button>
        </div>
        <div className="flex flex-wrap gap-4 justify-start">
          {batches.length > 0 ? (
            batches.map((element) => (
              <div
                className="bg-gray-100 p-6 rounded-md shadow-sm max-w-xs"
                key={element._id}
              >
                <h3 className="text-xl  mb-2">
                  {" "}
                  Batch Name:
                  {element.batch_name}
                </h3>
                <p className="text-gray-700 mb-1">
                  Start Time: {element.start_time.split("T")[1]}
                </p>
                <p className="text-gray-700">
                  End Time: {element.end_time.split("T")[1]}
                </p>
                <p className="text-gray-700">
                  Start Date: {element.start_date.split("T")[0]}
                </p>
                <p className="text-gray-700">
                  End Date: {element.end_date.split("T")[0]}
                </p>
                <p className="text-gray-700">Status : {element.status}</p>
                <p className="text-gray-700">
                  Instructor:{" "}
                  {element.instructor.fname + " " + element.instructor.lname}
                </p>
                <p className="text-gray-700">
                  Course: {element.course.course_name}
                </p>{" "}
                <p className="text-gray-700">
                  Lab Allocated: {element.lab_allocated.lab_no}
                </p>
                <div className="flex flex-col space-y-2 mt-4">
                  <button
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() =>
                      navigate(
                        `/dashboard/admin/labs/${labId}/batches/${element._id}/update`
                      )
                    }
                  >
                    Update Batch
                  </button>
                  <button
                    className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
            <p className="text-gray-600 text-center">
              No batches created in this lab
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Batches;
