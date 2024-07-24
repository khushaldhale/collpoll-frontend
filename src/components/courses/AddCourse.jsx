import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCourse } from "../../redux/slices/courseSlice";

const AddCourse = () => {
  const dispatch = useDispatch();

  // capturing whole data
  const [formData, setFormData] = useState({
    course_name: "",
    course_desc: "",
    lumpsum_price: "",
    installment_price: "",
    number_of_installment: "",
    installments: [],
    iterate: [],
  });

  // capturing only installment data
  const [installmentData, setInstallmentData] = useState({
    amount: "",
    due_day: "",
  });

  // over onchange of installment
  // capturing amount and due_day
  function installmentHandler(event) {
    const { type, name, value } = event.target;
    console.log(name + " " + value);

    setInstallmentData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  // over create  installment pushing  the installmentData into
  // installments of formData, here worki is done
  function submitInstallment(event) {
    console.log(installmentData);
    const data = formData.installments.map((element) => {
      return element;
    });

    data.push(installmentData);
    console.log("required array ", data);

    setFormData((prevData) => {
      return {
        ...prevData,
        installments: data,
      };
    });
  }

  const { categoryId } = useParams();
  const navigate = useNavigate();

  //  capturing all required data
  function changeHandler(event) {
    const { name, checked, type, value } = event.target;

    // this is done so that installments array can have value so that we can iterate that many times
    // and for that many iteration we can create installments
    if (name === "number_of_installment") {
      // empty array
      const arr = [];

      for (let i = 1; i <= value; i++) {
        arr.push(i); // filling  array that many times so that we can iterate
      }
      console.log(" arr is ", arr);
      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: value,
          iterate: arr, // mapped array , so that we can iterate
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  }

  //  submitting course, makinga call to an API
  function submitHandler(event) {
    event.preventDefault();
    formData.categoryId = categoryId;

    console.log(formData);

    dispatch(createCourse(formData)).then((data) => {
      if (data.payload.success) {
        navigate(-1);
      }
    });
  }

  function solve() {
    return <p> hello</p>;
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
          <label htmlFor="course_price" className="text-sm font-medium mb-1">
            Lumpsum Course Price
          </label>
          <input
            type="number"
            id="lumpsum_price"
            name="lumpsum_price"
            placeholder="Enter one time  course price"
            onChange={changeHandler}
            value={formData.lumpsum_price}
            className="border border-gray-300 rounded-lg p-2"
          />

          <label htmlFor="course_price" className="text-sm font-medium mb-1">
            Installment Price
          </label>
          <input
            type="number"
            id="installment_price"
            name="installment_price"
            placeholder="Enter Installment course price"
            onChange={changeHandler}
            value={formData.installment_price}
            className="border border-gray-300 rounded-lg p-2"
          />

          <label htmlFor="course_price" className="text-sm font-medium mb-1">
            Number of Installment
          </label>
          <input
            type="number"
            id="number_of_installment"
            name="number_of_installment"
            placeholder="Enter Number of Installment"
            onChange={changeHandler}
            value={formData.number_of_installment}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        {formData.iterate.map((element) => {
          return (
            <div>
              <input
                type="number"
                name="amount"
                id="amount"
                placeholder="Enter an Amount"
                onChange={installmentHandler}
              />
              <input
                type="number"
                name="due_day"
                id="due_day"
                placeholder="Enter  installment due day"
                onChange={installmentHandler}
              />

              <p onClick={submitInstallment}> create Installment</p>
            </div>
          );
        })}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
