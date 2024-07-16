import axios from "axios";
import { useState } from "react";
import "./LoginPage.css";

interface Login {
  nickname: string;
  password: string;
}

function LoginPage({ setToken }: { setToken: React.Dispatch<React.SetStateAction<string>> }) {
  const [loginData, setLoginData] = useState<Login>({
    nickname: "Igor",
    password: "siema",
  });

  const logIn = async () => {
    try {
      const response = await axios.post("http://172.16.61.119:3000/user/login", loginData);
      setToken(response.data.token);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <h3>Logination</h3>
      <input type="text" className="inputLogin" />
      <input type="password" className="inputLogin" />
      <button onClick={logIn}>Zaloguj</button>
    </>
  );
}

export default LoginPage;
