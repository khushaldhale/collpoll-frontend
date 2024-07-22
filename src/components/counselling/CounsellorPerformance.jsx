import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counsellorPerformance } from "../../redux/slices/counsellorSlice";

const CounsellorPerformance = () => {
  const performance = useSelector((state) => {
    return state.counsellor.performance;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(counsellorPerformance()).then((data) => {
      if (data.payload.success) {
        console.log("performance is fetched");
      }
    });
  }, []);
  return (
    <div>
      <p>CounsellorPerformance</p>

      {performance && (
        <div>
          <p>{"Total counselling till now " + performance.total_count}</p>
          <p>{"perfromance in percentage " + performance.performance}</p>
        </div>
      )}
    </div>
  );
};

export default CounsellorPerformance;
