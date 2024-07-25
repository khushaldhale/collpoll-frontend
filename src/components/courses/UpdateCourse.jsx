import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCourse,
  particularCourse,
  updateCourse,
} from "../../redux/slices/courseSlice";

// have to put update installment and updaete course thing
// also  have a llok at check
const UpdateCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, courseId } = useParams();

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
  useEffect(() => {
    dispatch(particularCourse({ courseId })).then((data) => {
      const iterate = Array.from(
        { length: data.payload.data?.number_of_installment },
        (_, i) => i + 1
      );

      if (data.payload.success) {
        setFormData({
          course_name: data.payload.data.course_name,
          course_desc: data.payload.data.course_desc,
          lumpsum_price: data.payload.data.lumpsum_price,
          installment_price: data.payload.data?.installment_price,
          number_of_installment: data.payload.data?.number_of_installment,
          isInstallment: data.payload.data.isInstallment,
          installments: data.payload.data?.installments,
          iterate,
        });
      }
    });
  }, []);

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

  // update  course here
  function submitHandler(event) {
    event.preventDefault();

    dispatch(updateCourse({ ...formData, categoryId, courseId })).then(
      (data) => {
        if (data.payload.success) {
          console.log("course is updated succesfuly");
          navigate(-1);
        }
      }
    );
  }

  // capturing amount and due_day
  function installmentHandler(event) {
    const { name, value } = event.target;
    setInstallmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function UpdateInstallment(event, data) {
    // update installment code here
    event.preventDefault();
    console.log(installmentData);
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
            {formData.iterate.map((element, index) => {
              return (
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
                    onClick={(event) => {
                      UpdateInstallment(event, element._id);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Update Installment
                  </button>
                </div>
              );
            })}
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

export default UpdateCourse;
