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
      <span>{message.nickname}</span>
      <span>{message.sendDate}</span>
      <div key={index} className={"message " + classValueMessage}>
        {message.content}
      </div>
    </div>
  );
}

export default MessageBox;
