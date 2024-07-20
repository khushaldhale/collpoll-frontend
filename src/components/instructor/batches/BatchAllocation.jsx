import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBatch,
  notAllocatedBatch,
} from "../../../redux/slices/studentSlice";
import { getAllLabs } from "../../../redux/slices/labSlice";
import { batchesByLab } from "../../../redux/slices/batchSlice";

const BatchAllocation = () => {
  const students_no_batch = useSelector((state) => {
    return state.student.students_no_batch;
  });

  const labs = useSelector((state) => {
    return state.lab.labs;
  });
  const batches = useSelector((state) => {
    return state.batch.batches;
  });

  const [formData, setFormData] = useState({
    studentId: "",
    batchId: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notAllocatedBatch()).then((data) => {
      if (data.payload.success) {
        console.log("student who are not allocated to batch are fetched");
      }
    });

    dispatch(getAllLabs()).then((data) => {
      if (data.payload.success) {
        console.log("all labs are fetched");
      }
    });
  }, []);

  function labHandler(event) {
    dispatch(batchesByLab({ [event.target.name]: event.target.value })).then(
      (data) => {
        if (data.payload.success) {
          console.log("all batches are fetched");
        }
      }
    );
  }

  function submitHandler(event) {
    event.preventDefault();

    dispatch(addToBatch(formData)).then((data) => {
      console.log("submit of add to batch ", data.payload);
      if (data.payload.success) {
        console.log("student is added to the batch");
      }
    });
  }
  return (
    <div>
      {students_no_batch.length > 0 ? (
        students_no_batch.map((element) => {
          return (
            <div>
              <p>{element.fname}</p>
              <p>{element.lname}</p>
              <p>{element.email}</p>

              {/* have to define other fields as well */}

              <form method="POST" onSubmit={submitHandler}>
                <select name="labId" id="labId" onChange={labHandler}>
                  <option value="">Select Lab </option>
                  {labs.map((element) => {
                    return (
                      <option value={element._id}>{element.lab_no} </option>
                    );
                  })}
                </select>

                <select
                  name="batchId"
                  id="batchId"
                  onChange={(event) => {
                    setFormData({
                      studentId: element._id,
                      batchId: event.target.value,
                    });
                  }}
                >
                  <option value="">Select Batch </option>
                  {batches.map((element) => {
                    return (
                      <option value={element._id}>{element.batch_name} </option>
                    );
                  })}
                </select>

                <button type="submit"> Add to Batch</button>

                {/*  create state for batchId and studentId and change them over submit make call to addToBAtch */}
              </form>
            </div>
          );
        })
      ) : (
        <p>No students are remained to allocate</p>
      )}
    </div>
  );
};

export default BatchAllocation;
