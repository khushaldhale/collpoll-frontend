import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counsellorPerformance } from "../../redux/slices/counsellorSlice";

const CounsellorPerformance = () => {
  const performance = useSelector((state) => state.counsellor.performance);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(counsellorPerformance()).then((data) => {
      if (data.payload.success) {
        console.log("Performance data is fetched");
      }
    });
  }, [dispatch]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Counsellor Performance</h2>

      {performance?.total_count ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-blue-100 p-4 rounded-lg border border-blue-200">
            <p className="text-lg font-medium text-blue-800">
              Total Counselling Sessions
            </p>
            <p className="text-xl font-bold text-blue-900">
              {performance.total_count}
            </p>
          </div>

          <div className="flex items-center justify-between bg-green-100 p-4 rounded-lg border border-green-200">
            <p className="text-lg font-medium text-green-800">
              Performance Percentage
            </p>
            <p className="text-xl font-bold text-green-900">
              {performance.performance}%
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No counselling sessions recorded yet.</p>
      )}
    </div>
  );
};

export default CounsellorPerformance;
