import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { particularBatch } from "../../../redux/slices/batchSlice";
import { createStudyMaterial } from "../../../redux/slices/studyMaterialSlice";
import { subByCourse } from "../../../redux/slices/subjectSlice";

//   batch id se course id nikalo then   all sub

const UploadStudyMaterial = () => {
  const { batchId } = useParams();

  const dispatch = useDispatch();
  const subjects = useSelector((state) => {
    return state.subject.subByCourse;
  });

  useEffect(() => {
    dispatch(particularBatch({ batchId })).then((data) => {
      console.log("batch is fetched ", data.payload);
      if (data.payload.success) {
        dispatch(subByCourse({ courseId: data.payload.data.course })).then(
          (data) => {
            console.log("is it working");
            console.log("sub are fetched", data.payload);
            if (data.payload.success) {
              console.log("all subjects are fetched");
            }
          }
        );
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    notes: "",
    subjectId: "",
    batchId,
  });

  const navigate = useNavigate();

  function changeHandler(event) {
    const { name, value, type } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "file" ? event.target.files[0] : value,
      };
    });
  }
  function submitHandler(event) {
    event.preventDefault();
    dispatch(createStudyMaterial(formData)).then((data) => {
      if (data.payload.success) {
        navigate(-1);
      }
    });
  }

  return (
    <div>
      <p>Upload Study Material </p>
      {/*  notes , batchid and subject id it want */}
      <form method="POST" onSubmit={submitHandler}>
        <input type="file" name="notes" onChange={changeHandler} />

        <select name="subjectId" id="subjectId" onChange={changeHandler}>
          <option value="">Select Sub </option>
          {subjects.map((element) => {
            return <option value={element._id}>{element.sub_name} </option>;
          })}
        </select>
        <button type="submit"> submit </button>
      </form>
    </div>
  );
};

export default UploadStudyMaterial;
