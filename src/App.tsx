import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiSolidChat } from "react-icons/bi";

import { socket } from "./service/socket";
import MessageForm from "./components/MessageForm/MessageForm";
import Chat from "./components/Chat/Chat";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatNav from "./components/ChatNav/ChatNav";
import Profile from "./components/Profile/Profile";

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

//TO DO
// handle data aby sie wyswietlala tylko godzina i minuta jezeli to dzisij
// wyswietla sie dzien tygodnia jezeli to ten tydzien
// wyswietla sie dały date jezeli ponad tydzien
// ladnie zrobic login page and registration
// zrobić aby się wyświetlał jeden nick gdy wiadomosci są pod sobą
// localstorage token -> sprawdzać czy jest token w bazie danych
// add group formularz
// scroll area na friends i groups

function App() {
  const [newMessage, setNewMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [myNickname, setMyNickname] = useState<string>("");
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(false);
  const [isChatChoosen, setIsChatChoosen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room>({ token: "", name: "", isGroup: false });
  const [inviteReqests, setInviteRequests] = useState<string[]>(["ruchacz_3000"]);

  useEffect(() => {
    socket.connect();

    socket.on("get:message", (message) => {
      // console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    socket.on("get:invite", (invite) => {
      if (invite.reciever === myNickname) {
        setInviteRequests((prevInvitesRequests) => [...prevInvitesRequests, invite.sender]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [myNickname]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageData = { nickname: myNickname, content: newMessage, token: currentRoom.token };
      socket.emit("send:message", messageData);
      // setMessages((messages) => [...messages, { nickname: "Igor", content: newMessage, sendDate: "" }]);  //for dev
      setNewMessage("");
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const element = document.querySelector(".scroll-area") as HTMLDivElement;
      if (element) {
        const start = element.scrollTop;
        const end = element.scrollHeight;
        const distance = end - start;
        const duration = 300;
        let startTime: number | null = null;

        const animateScroll = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          element.scrollTop = start + distance * progress;

          if (elapsed < duration) {
            window.requestAnimationFrame(animateScroll);
          } else {
            element.scrollTop = end;
          }
        };
        window.requestAnimationFrame(animateScroll);
      }
    }, 0);
  };
  return (
    <div className="container-fluid p-0">
      {token ? (
        <div className="container-fluid">
          <div className="row">
            <div className="header">
              <h1 className="text-center my-3">
                WamaChat <BiSolidChat />
              </h1>
              <div>
                <Profile myNickname={myNickname} setToken={setToken} token={token} inviteReqests={inviteReqests} />
              </div>
            </div>
          </div>
          <div className="row">
            <Sidebar
              rooms={rooms}
              setIsChatChoosen={setIsChatChoosen}
              setMessages={setMessages}
              setCurrentRoom={setCurrentRoom}
              myNickname={myNickname}
              scrollToBottom={scrollToBottom}
              setToken={setToken}
              token={token}
            />
            <div className="chat-container  col-12 col-md-9">
              {isChatChoosen ? (
                <>
                  <ChatNav currentRoom={currentRoom} />
                  <Chat messages={messages} myNickname={myNickname} />
                  <MessageForm newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
                </>
              ) : (
                <h1 className="chat-place-holder text-center p-5">Choose the chat</h1>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {isRegisterPage ? (
            <RegisterPage setIsRegisterPage={setIsRegisterPage} />
          ) : (
            <LoginPage setToken={setToken} setRooms={setRooms} setMyNickname={setMyNickname} />
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
