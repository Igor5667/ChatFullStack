import React, { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./service/socket";

import MessageForm from "./components/MessageForm/MessageForm";
import Chat from "./components/Chat/Chat";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";

export interface Message {
  userId: string;
  message: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { userId: "chuj", message: "siemka co tam" },
    { userId: "nie chuj", message: "a chuj ci na maske" },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(false);

  useEffect(() => {
    socket.connect();

    socket.on("load:message", (messages) => {
      setMessages(messages);
    });

    socket.on("get:message", (message) => {
      setMessages(() => [...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("send:message", { userId: "chuj", message: newMessage });
      setMessages(() => [...messages, { userId: "chuj", message: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <h1>WamaChat</h1>
        {token ? (
          <>
            <Chat messages={messages} />
            <MessageForm newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
          </>
        ) : (
          <>
            {isRegisterPage ? <RegisterPage setIsRegisterPage={setIsRegisterPage} /> : <LoginPage setToken={setToken} />}
            {isRegisterPage ? (
              <p className="login-or-register-button">
                Do you have an account? <a onClick={() => setIsRegisterPage(!isRegisterPage)}>logIn</a>
              </p>
            ) : (
              <p className="login-or-register-button" onClick={() => setIsRegisterPage(!isRegisterPage)}>
                Don't you have an account? <a onClick={() => setIsRegisterPage(!isRegisterPage)}>Register</a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
