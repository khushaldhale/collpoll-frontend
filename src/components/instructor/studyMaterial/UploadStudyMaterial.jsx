import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { particularBatch } from "../../../redux/slices/batchSlice";
import { createStudyMaterial } from "../../../redux/slices/studyMaterialSlice";
import { subByCourse } from "../../../redux/slices/subjectSlice";

const UploadStudyMaterial = () => {
  const { batchId } = useParams();
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject.subByCourse);

  useEffect(() => {
    dispatch(particularBatch({ batchId })).then((data) => {
      if (data.payload.success) {
        dispatch(subByCourse({ courseId: data.payload.data.course })).then(
          (data) => {
            if (data.payload.success) {
              console.log("All subjects are fetched");
            }
          }
        );
      }
    });
  }, [dispatch, batchId]);

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
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Upload Study Material</h2>

      <form
        method="POST"
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Notes
          </label>
          <input
            type="file"
            name="notes"
            id="notes"
            onChange={changeHandler}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="subjectId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Subject
          </label>
          <select
            name="subjectId"
            id="subjectId"
            onChange={changeHandler}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map((element) => (
              <option key={element._id} value={element._id}>
                {element.sub_name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn border rounded-md py-2 px-4 bg-blue-500 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadStudyMaterial;
