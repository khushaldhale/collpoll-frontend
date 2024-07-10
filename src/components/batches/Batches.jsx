import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { batchesByLab } from "../../redux/slices/batchSlice";

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

  useEffect(() => {
    dispatch(batchesByLab({ labId })).then((data) => {
      if (data.payload.success) {
        console.log("batches are here");
      }
    });
  });
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
                <p>{element.batch_name}</p>
                <p>{element.batch_name}</p>
              </div>
            );
          })
        ) : (
          <p>No batches created in this lab</p>
        )}
      </div>
    </div>
  );
};

export default Batches;
