import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteLab, getAllLabs } from "../../redux/slices/labSlice";

const Lab = () => {
  const labs = useSelector((state) => {
    return state.lab.labs;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllLabs()).then((data) => {
      if (data.payload.success) {
        console.log("Labs are fetched successfully");
      }
    });
  }, []);

  return (
    <div className="lab-container">
      <div className="lab-list">
        {labs.length > 0 ? (
          labs.map((element) => {
            return (
              <div className="lab-card" key={element._id}>
                <p>{element.lab_no}</p>

                <button
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
                  onClick={() => {
                    navigate(`/dashboard/admin/labs/${element._id}/batches`);
                  }}
                >
                  Show Batches
                </button>
              </div>
            );
          })
        ) : (
          <p>No labs are created yet</p>
        )}
      </div>

      <div className="add-lab">
        <button
          onClick={() => {
            navigate("/dashboard/admin/labs/add");
          }}
        >
          Add Lab
        </button>
      </div>
    </div>
  );
};

export default Lab;
