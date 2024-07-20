import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const UserLogin = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    dispatch(loginUser(formData)).then((data) => {
      if (data.payload.success) {
        navigate("/dashboard");
      }
    });
  }

  return (
    <div className="login-container">
      <form className="login-form" method="post" onSubmit={submitHandler}>
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          value={formData.email}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          value={formData.password}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserLogin;
