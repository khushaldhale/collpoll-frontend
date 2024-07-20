import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLab } from "../../redux/slices/labSlice";

const AddLab = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    lab_no: "",
  });

  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    dispatch(createLab(formData)).then((data) => {
      if (data.payload.success) {
        navigate("/dashboard/admin/labs");
      }
    });
  }

  return (
    <div className="add-lab-container p-4 max-w-full">
      <div className="form-container bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Lab</h2>
        <form
          method="post"
          onSubmit={submitHandler}
          className="flex flex-col space-y-4"
        >
          <input
            type="number"
            name="lab_no"
            placeholder="Lab Number"
            onChange={changeHandler}
            value={formData.lab_no}
            className="input-field border rounded-md p-2"
          />
          <button type="submit" className="btn border rounded-md py-2 px-4">
            Create Lab
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLab;
