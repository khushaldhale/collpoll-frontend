import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBatch,
  notAllocatedBatch,
} from "../../../redux/slices/studentSlice";
import { getAllLabs } from "../../../redux/slices/labSlice";
import { batchesByLab } from "../../../redux/slices/batchSlice";

const BatchAllocation = () => {
  const students_no_batch = useSelector(
    (state) => state.student.students_no_batch
  );
  const labs = useSelector((state) => state.lab.labs);
  const batches = useSelector((state) => state.batch.batches);

  const [formData, setFormData] = useState({
    studentId: "",
    batchId: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(notAllocatedBatch()).then((data) => {
      if (data.payload.success) {
        console.log("Students not allocated to batch are fetched");
      }
    });

    dispatch(getAllLabs()).then((data) => {
      if (data.payload.success) {
        console.log("All labs are fetched");
      }
    });
  }, [dispatch]);

  function labHandler(event) {
    dispatch(batchesByLab({ [event.target.name]: event.target.value })).then(
      (data) => {
        if (data.payload.success) {
          console.log("Batches for selected lab are fetched");
        }
      }
    );
  }

  function submitHandler(event) {
    event.preventDefault();
    dispatch(addToBatch(formData)).then((data) => {
      if (data.payload.success) {
        console.log("Student is added to the batch");
      }
    });
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Batch Allocation</h2>
      {students_no_batch.length > 0 ? (
        students_no_batch.map((student) => (
          <div
            key={student._id}
            className="bg-white shadow-md rounded-lg p-4 mb-6"
          >
            <h3 className="text-xl font-semibold mb-4">
              {student.fname} {student.lname}
            </h3>
            <p className="text-gray-600 mb-2">Email: {student.email}</p>

            <form method="POST" onSubmit={submitHandler} className="space-y-4">
              <div>
                <label
                  htmlFor="labId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Lab
                </label>
                <select
                  name="labId"
                  id="labId"
                  onChange={labHandler}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">Select Lab</option>
                  {labs.map((lab) => (
                    <option key={lab._id} value={lab._id}>
                      {lab.lab_no}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="batchId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Batch
                </label>
                <select
                  name="batchId"
                  id="batchId"
                  onChange={(event) =>
                    setFormData({
                      studentId: student._id,
                      batchId: event.target.value,
                    })
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">Select Batch</option>
                  {batches.map((batch) => (
                    <option key={batch._id} value={batch._id}>
                      {batch.batch_name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn border rounded-md py-2 px-4 w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Add to Batch
              </button>
            </form>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No students are remaining to allocate</p>
      )}
    </div>
  );
};

export default BatchAllocation;
