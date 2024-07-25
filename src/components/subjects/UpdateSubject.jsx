import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { particularSub, updateSub } from "../../redux/slices/subjectSlice";

const UpdateSubject = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sub_name: "",
    sub_desc: "",
  });

  const navigate = useNavigate();
  const { categoryId, courseId, subjectId } = useParams();

  useEffect(() => {
    dispatch(particularSub({ subjectId })).then((data) => {
      if (data.payload.success) {
        console.log("subject data ", data.payload);
        setFormData({
          sub_name: data.payload.data.sub_name,
          sub_desc: data.payload.data.sub_desc,
        });
      }
    });
  }, [dispatch, subjectId]);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    formData.categoryId = categoryId;
    formData.courseId = courseId;
    formData.subjectId = subjectId;

    dispatch(updateSub(formData)).then((data) => {
      if (data.payload.success) {
        navigate(-1);
      }
    });
  }

  return (
    <div className="update-subject-container p-4 max-w-lg mx-auto">
      <div className="form-container bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Subject
        </h2>
        <form onSubmit={submitHandler} className="flex flex-col space-y-4">
          <input
            type="text"
            name="sub_name"
            placeholder="Subject Name"
            onChange={changeHandler}
            value={formData.sub_name}
            className="w-full border rounded-lg p-2"
          />
          <input
            type="text"
            name="sub_desc"
            placeholder="Subject Description"
            onChange={changeHandler}
            value={formData.sub_desc}
            className="w-full border rounded-lg p-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Update Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubject;
