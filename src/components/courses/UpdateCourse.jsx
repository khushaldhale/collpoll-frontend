import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCourse,
  particularCourse,
  updateCourse,
} from "../../redux/slices/courseSlice";

const UpdateCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, courseId } = useParams();

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

  const [errors, setErrors] = useState({
    course_name: "",
    course_desc: "",
    lumpsum_price: "",
    installment_price: "",
    number_of_installment: "",
    installments: [],
  });

  useEffect(() => {
    dispatch(particularCourse({ courseId })).then((data) => {
      if (data.payload.success) {
        const iterate = Array.from(
          { length: data.payload.data?.number_of_installment },
          (_, i) => i + 1
        );

        setFormData({
          course_name: data.payload.data.course_name,
          course_desc: data.payload.data.course_desc,
          lumpsum_price: data.payload.data.lumpsum_price,
          installment_price: data.payload.data?.installment_price,
          number_of_installment: data.payload.data?.number_of_installment,
          isInstallment: data.payload.data.isInstallment,
          installments: data.payload.data?.installments || [],
          iterate,
        });
      }
    });
  }, [courseId, dispatch]);

  function validateField(name, value) {
    let error = "";
    switch (name) {
      case "course_name":
      case "course_desc":
        if (value.trim() === "") {
          error = `${name.replace("_", " ")} is required`;
        }
        break;
      case "lumpsum_price":
        if (formData.isInstallment && value.trim() === "") {
          error = "Lumpsum price is required if not using installments";
        }
        break;
      case "installment_price":
      case "number_of_installment":
        if (formData.isInstallment && value.trim() === "") {
          error = `${name.replace("_", " ")} is required`;
        }
        break;
      default:
        break;
    }
    return error;
  }

  function changeHandler(event) {
    const { name, type, value } = event.target;

    if (name === "number_of_installment") {
      const iterate = Array.from({ length: value }, (_, i) => i + 1);
      const installments = Array.from({ length: value }, () => ({
        amount: "",
        due_day: "",
      }));
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        iterate,
        installments,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? event.target.checked : value,
      }));
    }

    // Validate field on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    // Validate field on blur
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  }

  function handleInstallmentChange(index, event) {
    const { name, value } = event.target;
    const updatedInstallments = formData.installments.map((installment, i) =>
      i === index ? { ...installment, [name]: value } : installment
    );
    setFormData((prevData) => ({
      ...prevData,
      installments: updatedInstallments,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    const newErrors = {
      course_name: validateField("course_name", formData.course_name),
      course_desc: validateField("course_desc", formData.course_desc),
      lumpsum_price: validateField("lumpsum_price", formData.lumpsum_price),
      installment_price: validateField(
        "installment_price",
        formData.installment_price
      ),
      number_of_installment: validateField(
        "number_of_installment",
        formData.number_of_installment
      ),
    };

    // Validate installments if needed
    if (formData.isInstallment) {
      const installmentErrors = formData.installments.map((installment) => ({
        amount: validateField("installment_price", installment.amount),
        due_day: validateField("due_day", installment.due_day),
      }));
      newErrors.installments = installmentErrors;
    }

    setErrors(newErrors);

    // Check if there are no errors before dispatching
    if (
      !Object.values(newErrors).some((error) => error) &&
      (!formData.isInstallment ||
        !newErrors.installments.some((e) => e.amount || e.due_day))
    ) {
      dispatch(updateCourse({ ...formData, categoryId, courseId })).then(
        (data) => {
          if (data.payload.success) {
            console.log("Course updated successfully");
            navigate(-1);
          }
        }
      );
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Update Course</h2>
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
            onBlur={handleBlur}
            value={formData.course_name}
            className="border border-gray-300 rounded-lg p-2"
          />
          {errors.course_name && (
            <p className="text-red-500 text-sm mt-1">{errors.course_name}</p>
          )}
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
            onBlur={handleBlur}
            value={formData.course_desc}
            className="border border-gray-300 rounded-lg p-2"
          />
          {errors.course_desc && (
            <p className="text-red-500 text-sm mt-1">{errors.course_desc}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="lumpsum_price" className="text-sm font-medium mb-1">
            Lumpsum Course Price
          </label>
          <input
            type="number"
            id="lumpsum_price"
            name="lumpsum_price"
            placeholder="Enter one-time course price"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={formData.lumpsum_price}
            className="border border-gray-300 rounded-lg p-2"
          />
          {errors.lumpsum_price && (
            <p className="text-red-500 text-sm mt-1">{errors.lumpsum_price}</p>
          )}
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            name="isInstallment"
            id="isInstallment"
            checked={formData.isInstallment}
            onChange={changeHandler}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <label htmlFor="isInstallment" className="text-sm font-medium">
            Is Installment
          </label>
        </div>

        {formData.isInstallment && (
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
                onBlur={handleBlur}
                value={formData.installment_price}
                className="border border-gray-300 rounded-lg p-2"
              />
              {errors.installment_price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.installment_price}
                </p>
              )}
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
                onBlur={handleBlur}
                value={formData.number_of_installment}
                className="border border-gray-300 rounded-lg p-2"
              />
              {errors.number_of_installment && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.number_of_installment}
                </p>
              )}
            </div>
            {formData.installments.map((installment, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor={`amount_${index}`}
                    className="text-sm font-medium mb-1"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id={`amount_${index}`}
                    placeholder="Enter amount"
                    onChange={(e) => handleInstallmentChange(index, e)}
                    value={installment.amount}
                    className="border border-gray-300 rounded-lg p-2"
                  />
                  {errors.installments[index]?.amount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.installments[index].amount}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor={`due_day_${index}`}
                    className="text-sm font-medium mb-1"
                  >
                    Due Day
                  </label>
                  <input
                    type="number"
                    name="due_day"
                    id={`due_day_${index}`}
                    placeholder="Enter due day"
                    onChange={(e) => handleInstallmentChange(index, e)}
                    value={installment.due_day}
                    className="border border-gray-300 rounded-lg p-2"
                  />
                  {errors.installments[index]?.due_day && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.installments[index].due_day}
                    </p>
                  )}
                </div>
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

export default UpdateCourse;
