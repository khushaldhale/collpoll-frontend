import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOTP } from "../../redux/slices/authSlice";
const SendOTP = ({ setIsRegistered }) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const dispatch = useDispatch();

  function changeHandler(event) {
    setFormData({
      email: event.target.value,
    });
  }
  function submitHandler(event) {
    event.preventDefault();
    dispatch(sendOTP(formData)).then((data) => {
      console.log(data.payload.otp);
      setIsRegistered(true);
    });
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
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
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
