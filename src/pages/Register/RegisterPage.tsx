import axios from "axios";
import { useState } from "react";
import "./RegisterPage.css";

interface Register {
  nickname: string;
  email: string;
  password: string;
}

function RegisterPage({ setIsRegisterPage }: { setIsRegisterPage: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [registerData, setRegisterData] = useState<Register>({ nickname: "", email: "", password: "" });

  const register = async () => {
    try {
      const response = await axios.post("http://172.16.61.119:18353/user/createuser", registerData);
      setIsRegisterPage(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-page">
      <form
        className="login-or-registration-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h3 className="mb-4">Registration</h3>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            type="text"
            placeholder="login"
            value={registerData.nickname}
            onChange={(e) => setRegisterData({ ...registerData, nickname: e.target.value })}
          />
          <label htmlFor="floatingInput">login</label>
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            type="email"
            placeholder="email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
          />
          <label htmlFor="floatingInput">email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            type="password"
            placeholder="login"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          />
          <label htmlFor="floatingInput">password</label>
        </div>

        <button onClick={register} className="button-register  btn btn-outline-dark mt-2">
          SignIn
        </button>
        <p className="login-or-register-button fst-italic mt-4">
          Do you have an account?{" "}
          <a className="link" onClick={() => setIsRegisterPage(false)}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
