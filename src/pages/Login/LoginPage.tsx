import axios from "axios";
import { useState } from "react";
import "./LoginPage.css";

interface LoginData {
  nickname: string;
  password: string;
}

interface LoginFunctions {
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}

function LoginPage({ setToken, setNickname }: LoginFunctions) {
  const [loginData, setLoginData] = useState<LoginData>({
    nickname: "",
    password: "",
  });

  const logIn = async () => {
    try {
      const response = await axios.post("http://172.16.61.119:3000/user/login", loginData);
      console.log(response.data);
      setToken(response.data.token);
      setNickname(loginData.nickname);
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
      <h3>Logination</h3>
      <input
        type="text"
        className="inputLogin"
        value={loginData.nickname}
        onChange={(e) => setLoginData({ ...loginData, nickname: e.target.value })}
      />
      <input
        type="password"
        className="inputLogin"
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
      />
      <button className="btn btn-outline-dark" onClick={logIn}>
        LogIn
      </button>
    </form>
  );
}

export default LoginPage;
