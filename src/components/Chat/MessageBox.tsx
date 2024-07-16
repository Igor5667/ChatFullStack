import React from "react";
import "./Chat.css";
import { Message } from "../../App";

interface MessageBox {
  classValueContainer: string;
  classValueMessage: string;
  message: Message;
  index: number;
}

function MessageBox({ classValueContainer, classValueMessage, message, index }: MessageBox) {
  return (
    <div className={"message-container " + classValueContainer}>
      <div key={index} className={"message " + classValueMessage}>
        {message.message}
      </div>
    </div>
  );
}

export default MessageBox;
