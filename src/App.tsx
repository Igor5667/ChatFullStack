import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import "moment/locale/pl";
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

// TO DO
// handle data aby sie wyswietlala tylko godzina i minuta jezeli to dzisij
// wyswietla sie dzien tygodnia jezeli to ten tydzien
// wyswietla sie dały date jezeli ponad tydzien
// ladnie zrobic login page and registration
// zrobić aby się wyświetlał jeden nick gdy wiadomosci są pod sobą
// add group formularz
// scroll area na friends i groups

function App() {
  const [newMessage, setNewMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [myNickname, setMyNickname] = useState<string>("");
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(false);
  const [isChatChoosen, setIsChatChoosen] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      nickname: "Max",
      content: "Hello world!",
      sendDate: "15:25 26.07.2024",
    },
    {
      nickname: "igor",
      content: "Another hello world!",
      sendDate: "15:25 26.07.2024",
    },
    {
      nickname: "Max",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt auctor interdum. Pellentesque pharetra sodales neque, at tincidunt erat congue a. Maecenas a tincidunt augue. In hac habitasse platea dictumst. Maecenas faucibus velit purus, vel efficitur justo interdum ut.",
      sendDate: "15:25 26.07.2024",
    },
    {
      nickname: "igor",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt auctor interdum. Pellentesque pharetra sodales neque, at tincidunt erat congue a. Maecenas a tincidunt augue. In hac habitasse platea dictumst. Maecenas faucibus velit purus, vel efficitur justo interdum ut.",
      sendDate: "15:25 26.07.2024",
    },
  ]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room>({ token: "fake token", name: "Max", isGroup: false });
  const [inviteReqests, setInviteRequests] = useState<string[]>([]);

  useEffect(() => {
    //socket.connect();

    socket.on("get:message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    socket.on("get:invite", (invite) => {
      if (invite.receiver === myNickname) {
        console.log(`Jam ${invite.receiver} otrzymał invite REQUESTA od ${invite.sender}`);
        setInviteRequests((prevInvitesRequests) => [...prevInvitesRequests, invite.sender]);
      }
    });

    socket.on("get:all-invites", (response) => {
      if (response.nickname === myNickname) {
        console.log(`Loaduje wszystkie invites dla mej osobowosci ${response.nickname}`);
        setInviteRequests(response.arr);
      }
    });

    socket.on("get:room", (response: { sender: Room; receiver: Room }) => {
      if (response.receiver.name === myNickname) {
        setRooms((rooms) => [...rooms, response.sender]);
      } else if (response.sender.name === myNickname) {
        setRooms((rooms) => [...rooms, response.receiver]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      // with server
      // const messageData = { nickname: myNickname, content: newMessage, token: currentRoom.token };
      // socket.emit("send:message", messageData);

      // with only front-end

      moment.locale("pl");
      const result = moment().format("HH:mm DD.MM.YYYY");
      setMessages((messages) => [...messages, { nickname: "igor", content: newMessage, sendDate: result }]);
      setNewMessage("");
      scrollToBottom();
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
                Chat <BiSolidChat />
              </h1>
              <div>
                <Profile
                  myNickname={myNickname}
                  setToken={setToken}
                  token={token}
                  inviteReqests={inviteReqests}
                  setInviteRequests={setInviteRequests}
                  setRooms={setRooms}
                />
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
