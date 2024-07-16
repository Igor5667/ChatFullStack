import React, { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";

interface Message {
  userId: string;
  message: string;
}
//test
function App() {
  const [messages, setMessages] = useState<Message[]>([
    { userId: "chuj", message: "siemka co tam" },
    { userId: "nie chuj", message: "a chuj ci na maske" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("load:message", (messages) => {
      setMessages(messages);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      // socket.emit("send:message", { userId: "chuj", message: newMessage });
      setMessages(() => [...messages, { userId: "chuj", message: newMessage }]);
      setNewMessage("");
    }
  };
  //test

  return (
    <div className="main-container">
      <div className="container">
        <h1>WamaChat</h1>
        <div className="chat-container">
          {messages.map((message, index) => {
            let classValueContainer: string = "not-my-container";
            let classValueMessage: string = "not-my-message";
            if (message.userId === "chuj") {
              classValueContainer = "my-container";
              classValueMessage = "my-message";
            }
            return (
              <div className={"message-container " + classValueContainer}>
                <div key={index} className={"message " + classValueMessage}>
                  {message.message}
                </div>
              </div>
            );
          })}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
