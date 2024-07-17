import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { socket } from "./service/socket";

import MessageForm from "./components/MessageForm/MessageForm";
import Chat from "./components/Chat/Chat";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import Sidebar from "./components/Sidebar/Sidebar";

export interface Message {
  nickname: string;
  content: string;
  sendDate: string;
}

export interface User {
  id: number;
  nickname: string;
}

function App() {
  const [newMessage, setNewMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.connect();

    socket.on("load:message", (laodData) => {
      console.log("to otrzymuję z loada");
      console.log(laodData);
      setMessages(laodData.messages);
      setUsers(laodData.users);
    });

    socket.on("get:message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      console.log({ nickname: nickname, content: newMessage });
      socket.emit("send:message", { nickname: nickname, content: newMessage, sendDate: "to jest data" });
      // setMessages((messages) => [...messages, { nickname: "Igor", content: newMessage, sendDate: "" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="container-fluid p-0">
      {token ? (
        <div className="container-fluid">
          <div className="header  row">
            <h1 className="text-center my-3">WamaChat</h1>
          </div>
          <div className="row ">
            <Sidebar users={users} />
            <div className="chat-container  col-12 col-md-9 p-3">
              <Chat messages={messages} nickname={nickname} />
              <MessageForm newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {isRegisterPage ? (
            <RegisterPage setIsRegisterPage={setIsRegisterPage} />
          ) : (
            <LoginPage setToken={setToken} setNickname={setNickname} />
          )}
          {isRegisterPage ? (
            <p className="login-or-register-button fst-italic">
              Do you have an account?{" "}
              <a className="link" onClick={() => setIsRegisterPage(!isRegisterPage)}>
                logIn
              </a>
            </p>
          ) : (
            <p className="login-or-register-button fst-italic">
              Don't you have an account?{" "}
              <a className="link" onClick={() => setIsRegisterPage(!isRegisterPage)}>
                Register
              </a>
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
