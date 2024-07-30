import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOTP } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const SendOTP = ({ setIsRegistered }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  function validateField(name, value) {
    let error = "";
    if (name === "email") {
      error = validateEmail(value) ? "" : "Please enter a valid email address";
    }
    return error;
  }

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData({
      [name]: value,
    });

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

  function submitHandler(event) {
    event.preventDefault();

    // Validate email field
    const newErrors = {
      email: validateField("email", formData.email),
    };

    setErrors(newErrors);

    if (!newErrors.email) {
      dispatch(sendOTP(formData)).then((data) => {
        if (data.payload.success) {
          setIsRegistered(true);
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
      });
    } else {
      toast.error("Please fix the errors in the form.");
    }
  }

  return (
    <div className="flex items-center justify-center h-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form onSubmit={submitHandler} method="POST" className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            onBlur={handleBlur}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendOTP;
