import { useState } from "react";
import RegisterUSER from "../components/auth/Register";
import SendOTP from "../components/auth/SendOTP";

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="register-container">
      {isRegistered ? (
        <RegisterUSER> </RegisterUSER>
      ) : (
        <SendOTP setIsRegistered={setIsRegistered}></SendOTP>
      )}
    </div>
  );
};

export default Register;
