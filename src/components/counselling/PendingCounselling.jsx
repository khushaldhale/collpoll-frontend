import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  admitStudent,
  getPendingStudents,
} from "../../redux/slices/pendingStudentsSlice";

const PendingCounselling = () => {
  const pendingStudents = useSelector(
    (state) => state.pendingStudents.pendingStudents
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPendingStudents()).then((data) => {
      if (data.payload.success) {
        console.log("Pending students are fetched");
      }
    });
  }, [dispatch]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Pending Counselling
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {pendingStudents.length > 0 ? (
          pendingStudents.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
            >
              <p className="text-xl font-semibold text-center">
                {element.fname} {element.lname}
              </p>
              <p className="text-gray-700 text-center">{element.email}</p>
              <p className="text-gray-600 text-center">{element.contact}</p>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() =>
                    dispatch(admitStudent({ userId: element._id })).then(
                      (data) => {
                        if (data.payload.success) {
                          console.log("Admission given");
                        }
                      }
                    )
                  }
                  className="border rounded-lg py-2 px-4 w-full max-w-xs text-center hover:bg-gray-200"
                >
                  Give Admission
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center">
            No pending students for counselling
          </p>
        )}
      </div>
    </div>
  );
};

export default PendingCounselling;
