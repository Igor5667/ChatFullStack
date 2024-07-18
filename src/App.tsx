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

export interface Room {
  token: string;
  name: string;
  isGroup: boolean;
}

// handle data aby sie wyswietlala tylko godzina i minuta jezeli to dzisij
// wyswietla sie dzien tygodnia jezeli to ten tydzien
// wyswietla sie dały date jezeli ponad tydzien

// zrobic zeby getem pobieralo restAPIm load

function App() {
  const [newMessage, setNewMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(false);
  const [isChatChoosen, setIsChatChoosen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [nickname, setNickname] = useState<string>("");
  const [currentRoomToken, setCurrentRoomToken] = useState<string>("");

  useEffect(() => {
    socket.connect();

    // socket.on("load:message", (laodData) => {
    //   console.log("to otrzymuję z loada");
    //   console.log(laodData);
    //   setUsers(laodData);
    // });

    socket.on("get:message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageData = { nickname: nickname, content: newMessage, token: currentRoomToken };
      console.log(messageData);
      socket.emit("send:message", messageData);
      setMessages((messages) => [...messages, { nickname: "Igor", content: newMessage, sendDate: "" }]);
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
          <div className="row">
            <Sidebar
              rooms={rooms}
              setIsChatChoosen={setIsChatChoosen}
              setMessages={setMessages}
              setCurrentRoomToken={setCurrentRoomToken}
            />
            <div className="chat-container  col-12 col-md-9 p-3">
              {isChatChoosen ? (
                <>
                  <Chat messages={messages} nickname={nickname} />
                  <MessageForm newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
                </>
              ) : (
                <h1 className="chat-place-holder">nie wybrano chata</h1>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {isRegisterPage ? (
            <RegisterPage setIsRegisterPage={setIsRegisterPage} />
          ) : (
            <LoginPage setToken={setToken} setRooms={setRooms} setNickname={setNickname} />
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
