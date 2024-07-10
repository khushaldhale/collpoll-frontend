import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createLab } from "../../redux/slices/labSlice";

const AddLab = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    lab_no: "",
  });

  const navigate = useNavigate();

  function changeHandler(event) {
    console.log(event.target.name, " : ", event.target.value);
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }
  function submitHandler(event) {
    event.preventDefault();

    dispatch(createLab(formData)).then((data) => {
      if (data.payload.success) {
        navigate(-1);
      }
    });
  }

  return (
    <div>
      <form method="post" onSubmit={submitHandler}>
        <input
          type="number"
          name="lab_no"
          placeholder="lab number"
          onChange={changeHandler}
          value={formData.lab_no}
        />
        <button type="submit"> Create Sub </button>
      </form>
    </div>
  );
};

export default AddLab;
