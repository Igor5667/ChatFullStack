import React, { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./service/socket";
import axios from "axios";

import MessageForm from "./components/MessageForm/MessageForm";
import Chat from "./components/Chat/Chat";

export interface Message {
  userId: string;
  message: string;
}

interface Login {
  nickname: string;
  password: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { userId: "chuj", message: "siemka co tam" },
    { userId: "nie chuj", message: "a chuj ci na maske" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [login, setLogin] = useState<Login>({
    nickname: "Igor",
    password: "siema",
  });

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

  const logIn = async () => {
    try {
      const response = await axios.post("http://172.16.61.119:3000", login);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <h1>WamaChat</h1>

        <Chat messages={messages} />

        <MessageForm newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
