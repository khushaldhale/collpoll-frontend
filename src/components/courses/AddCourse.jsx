import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCourse } from "../../redux/slices/courseSlice";

const AddCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  // capturing whole data
  const [formData, setFormData] = useState({
    course_name: "",
    course_desc: "",
    lumpsum_price: "",
    installment_price: "",
    number_of_installment: "",
    isInstallment: false,
    installments: [],
    iterate: [],
  });

  // capturing only installment data
  const [installmentData, setInstallmentData] = useState({
    amount: "",
    due_day: "",
  });

  // capturing amount and due_day
  function installmentHandler(event) {
    const { name, value } = event.target;
    setInstallmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // pushing the installmentData into installments of formData
  function submitInstallment(event) {
    console.log(installmentData);
    event.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      installments: [...prevData.installments, installmentData],
    }));
    setInstallmentData({ amount: "", due_day: "" }); // reset installment data after submission
  }

  // capturing all required data
  function changeHandler(event) {
    const { name, type, value } = event.target;

    console.log(name + "  ", value + " " + event.target?.checked);
    if (name === "number_of_installment") {
      const iterate = Array.from({ length: value }, (_, i) => i + 1);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        iterate,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? event.target.checked : value,
      }));
    }
  }

  // submitting course
  function submitHandler(event) {
    event.preventDefault();
    dispatch(createCourse({ ...formData, categoryId })).then((data) => {
      if (data.payload.success) {
        navigate(-1);
      }
    });
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Course</h2>
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="flex flex-col">
          <label htmlFor="course_name" className="text-sm font-medium mb-1">
            Course Name
          </label>
          <input
            type="text"
            id="course_name"
            name="course_name"
            placeholder="Enter course name"
            onChange={changeHandler}
            value={formData.course_name}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="course_desc" className="text-sm font-medium mb-1">
            Course Description
          </label>
          <input
            type="text"
            id="course_desc"
            name="course_desc"
            placeholder="Enter course description"
            onChange={changeHandler}
            value={formData.course_desc}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lumpsum_price" className="text-sm font-medium mb-1">
            Lumpsum Course Price
          </label>
          <input
            type="number"
            id="lumpsum_price"
            name="lumpsum_price"
            placeholder="Enter one time course price"
            onChange={changeHandler}
            value={formData.lumpsum_price}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* conditional rendering of installmnets  */}
        <label htmlFor="isInstallment">Is Installment</label>
        <input
          type="checkbox"
          name="isInstallment"
          id="isInstallment"
          checked={formData.isInstallment}
          onChange={changeHandler}
        />

        {/*  putting condition for installments  */}

        {formData.isInstallment && (
          //  parent tag
          <div>
            <div className="flex flex-col">
              <label
                htmlFor="installment_price"
                className="text-sm font-medium mb-1"
              >
                Installment Price
              </label>
              <input
                type="number"
                id="installment_price"
                name="installment_price"
                placeholder="Enter installment course price"
                onChange={changeHandler}
                value={formData.installment_price}
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="number_of_installment"
                className="text-sm font-medium mb-1"
              >
                Number of Installments
              </label>
              <input
                type="number"
                id="number_of_installment"
                name="number_of_installment"
                placeholder="Enter number of installments"
                onChange={changeHandler}
                value={formData.number_of_installment}
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
            {formData.iterate.map((element, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Enter an amount"
                  onChange={installmentHandler}
                  // value={installmentData.amount}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                <input
                  type="number"
                  name="due_day"
                  id="due_day"
                  placeholder="Enter installment due day"
                  onChange={installmentHandler}
                  // value={installmentData.due_day}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                <button
                  onClick={submitInstallment}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Create Installment
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
