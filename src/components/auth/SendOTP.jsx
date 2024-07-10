import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOTP } from "../../redux/slices/authSlice";
import "./SendOTP.css";
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
    <div className="otp-container">
      <form method="POST" onSubmit={submitHandler}>
        <input
          type="text"
          name="email"
          onChange={changeHandler}
          placeholder="email"
        />
        <br></br>

        <button type="submit"> SEND OTP</button>
      </form>
    </div>
  );
};

export default SendOTP;
