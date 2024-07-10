import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  admitStudent,
  getPendingStudents,
} from "../../redux/slices/pendingStudentsSlice";

const PendingCounselling = () => {
  const pendingStudents = useSelector((state) => {
    return state.pendingStudents.pendingStudents;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPendingStudents()).then((data) => {
      if (data.payload.success) {
        console.log("pending students are fetched");
      }
    });
  }, []);

  return (
    <div>
      <div>
        {pendingStudents.length > 0 ? (
          pendingStudents.map((element) => {
            return (
              <div>
                <p>{element.fname}</p>
                <p>{element.lname}</p>
                <p>{element.email}</p>
                <p>{element.contact}</p>
                {/* <p>{element.course_interested_in}</p> */}
                {/* // we have to show every  detail of the course */}

                <button
                  onClick={() => {
                    dispatch(admitStudent({ userId: element._id })).then(
                      (data) => {
                        if (data.payload.success) {
                          console.log("admission given");
                        }
                      }
                    );
                  }}
                >
                  Give Admission
                </button>
              </div>
            );
          })
        ) : (
          <p>No pending students are for counselling</p>
        )}
      </div>
    </div>
  );
};

export default PendingCounselling;
