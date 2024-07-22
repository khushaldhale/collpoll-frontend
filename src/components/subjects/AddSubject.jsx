import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createSub } from "../../redux/slices/subjectSlice";

const AddSubject = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sub_name: "",
    sub_desc: "",
  });

  const navigate = useNavigate();
  const { categoryId, courseId } = useParams();

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

    dispatch(createSub(formData)).then((data) => {
      if (data.payload.success) {
        navigate(-1);
      }
    });
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Subject</h2>
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
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
          className="w-full border rounded-lg py-2 px-4 hover:bg-gray-200"
        >
          Create Subject
        </button>
      </form>
    </div>
  );
};

export default AddSubject;
