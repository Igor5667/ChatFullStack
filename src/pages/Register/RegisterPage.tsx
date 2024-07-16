import axios from "axios";
import { useState } from "react";
import "./RegisterPage.css";

interface Register {
  nickname: string;
  password: string;
}

function RegisterPage({ setIsRegisterPage }: { setIsRegisterPage: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [registerData, setRegisterData] = useState<Register>({
    nickname: Math.random().toString(),
    password: "siema",
  });

  const register = async () => {
    try {
      const response = await axios.post("http://172.16.61.119:3000/user/createuser", registerData);
      setIsRegisterPage(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <h3>Registration</h3>
      <input type="text" className="inputRegister" />
      <input type="password" className="inputRegister" />
      <button onClick={register}>Register</button>
    </>
  );
}

export default RegisterPage;
