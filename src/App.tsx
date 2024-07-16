import React, { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./service/socket";

import MessageForm from "./components/MessageForm/MessageForm";
import Chat from "./components/Chat/Chat";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";

export interface Message {
  nickname: string;
  content: string;
  sendDate: string;
}

function App() {
  const [newMessage, setNewMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    socket.connect();

    socket.on("load:message", (messages) => {
      setMessages(messages);
    });

    socket.on("get:message", (message) => {
      if (counter >= 1) {
        return;
      }
      console.log(message);
      setMessages((messages) => [...messages, message]);
      setCounter(counter + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      console.log({ nickname: nickname, content: newMessage });
      socket.emit("send:message", { nickname: nickname, content: newMessage, sendDate: "to jest data" });
      setNewMessage("");
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <h1>WamaChat</h1>
        {token ? (
          <>
            <Chat messages={messages} nickname={nickname} />
            <MessageForm newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
          </>
        ) : (
          <>
            {isRegisterPage ? (
              <RegisterPage setIsRegisterPage={setIsRegisterPage} />
            ) : (
              <LoginPage setToken={setToken} setNickname={setNickname} />
            )}
            {isRegisterPage ? (
              <p className="login-or-register-button">
                Do you have an account? <a onClick={() => setIsRegisterPage(!isRegisterPage)}>logIn</a>
              </p>
            ) : (
              <p className="login-or-register-button">
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
