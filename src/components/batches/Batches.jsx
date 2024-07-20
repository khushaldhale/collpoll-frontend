import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { batchesByLab, deleteBatch } from "../../redux/slices/batchSlice";

// we have to fetch all the courses that we have and instructors that we have here
// have to define store for that as welll or only Thunk , need to think over that
// we can have extra key as well  in redux store to maintain such  data.
// will think and work over that
const Batches = () => {
  const batches = useSelector((state) => {
    return state.batch.batches;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { labId } = useParams();
  console.log("id outside , ", labId);

  useEffect(() => {
    dispatch(batchesByLab({ labId })).then((data) => {
      if (data.payload.success) {
        console.log("batches are here");
      }
    });
  }, []);
  return (
    <div>
      <div>
        {batches.length > 0 ? (
          batches.map((element) => {
            return (
              <div>
                <p>{element.batch_name}</p>
                <p>{element.start_time}</p>
                <p>{element.end_time}</p>
                {/* many more things are yet to define that we have to  do  */}

                <button
                  onClick={() => {
                    navigate(
                      `/dashboard/admin/labs/${labId}/batches/${element._id}/update`
                    );
                  }}
                >
                  Update Batch
                </button>
                <button
                  onClick={() => {
                    dispatch(deleteBatch({ labId, batchId: element._id }));
                  }}
                >
                  Delete Batch
                </button>
              </div>
            );
          })
        ) : (
          <p>No batches created in this lab</p>
        )}
      </div>

      <div>
        <button
          onClick={() => {
            navigate(`/dashboard/admin/labs/${labId}/batches/add`);
          }}
        >
          Add Batch
        </button>
      </div>
    </div>
  );
};

export default Batches;
