import axios from "axios";
import { useState } from "react";
import "./RegisterPage.css";

interface Register {
  nickname: string;
  password: string;
}

function RegisterPage({ setIsRegisterPage }: { setIsRegisterPage: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [registerData, setRegisterData] = useState<Register>({ nickname: "", password: "" });

  const register = async () => {
    try {
      const response = await axios.post("http://172.16.61.119:18353/user/createuser", registerData);
      setIsRegisterPage(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <form
      className="login-or-registration-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h3>Registration</h3>
      <input
        type="text"
        className="inputRegister"
        value={registerData.nickname}
        onChange={(e) => setRegisterData({ ...registerData, nickname: e.target.value })}
      />
      <input
        type="password"
        className="inputRegister"
        value={registerData.password}
        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
      />
      <button onClick={register}>SignIn</button>
    </form>
  );
}

export default RegisterPage;
