import axios from "axios";
import { useState } from "react";
import "./LoginPage.css";
import { Room } from "../../App";

interface LoginData {
  nickname: string;
  password: string;
}

interface LoginParams {
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  setMyNickname: React.Dispatch<React.SetStateAction<string>>;
  setIsRegisterPage: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginPage({ setToken, setRooms, setMyNickname, setIsRegisterPage }: LoginParams) {
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
    <div className="login-page">
      <form
        className="login-or-registration-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h3 className="mb-4">Login</h3>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            type="text"
            placeholder="login"
            value={loginData.nickname}
            onChange={(e) => setLoginData({ ...loginData, nickname: e.target.value })}
          />
          <label htmlFor="floatingInput">login</label>
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            type="email"
            placeholder="email"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <label htmlFor="floatingInput">password</label>
        </div>

        <button className="button-login  btn btn-outline-dark mt-2" onClick={logIn}>
          LogIn
        </button>
        <p className="login-or-register-button fst-italic mt-4">
          Don't you have an account?{" "}
          <a className="link" onClick={() => setIsRegisterPage(true)}>
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
