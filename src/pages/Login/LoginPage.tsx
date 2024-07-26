import axios from "axios";
import { useState } from "react";
import "./LoginPage.css";
import { Room } from "../../App";

interface LoginData {
  nickname: string;
  password: string;
}

interface LoginFunctions {
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  setMyNickname: React.Dispatch<React.SetStateAction<string>>;
}

function LoginPage({ setToken, setRooms, setMyNickname }: LoginFunctions) {
  const [loginData, setLoginData] = useState<LoginData>({
    nickname: "",
    password: "",
  });

  const logIn = async () => {
    //With server

    // try {
    //   const response = await axios.post("http://172.16.61.119:18353/user/login", loginData);
    //   setRooms(response.data.rooms);
    //   setMyNickname(loginData.nickname);
    //   setToken(response.data.token);
    // } catch (error) {
    //   console.error("Error:", error);
    // }

    //End with server

    //With only Front-End

    setToken("i have token");
    setRooms([
      {
        token: "abc123",
        name: "John",
        isGroup: false,
      },
      {
        token: "def456",
        name: "Max",
        isGroup: false,
      },
      {
        token: "def456",
        name: "Alex",
        isGroup: false,
      },
      {
        token: "ghi789",
        name: "Developers",
        isGroup: true,
      },
      {
        token: "jkl012",
        name: "Golf",
        isGroup: true,
      },
    ]);
    setMyNickname(loginData.nickname);

    //End only Front-End
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
        placeholder="login"
        className="inputLogin"
        value={loginData.nickname}
        onChange={(e) => setLoginData({ ...loginData, nickname: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
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
