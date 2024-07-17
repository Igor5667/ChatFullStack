import React, { useState } from "react";
import "./Chat.css";
import { Message } from "../../App";

interface MessageBox {
  message: Message;
  index: number;
}

function OthersMessageBox({ message, index }: MessageBox) {
  const [isShownDate, setIsShownDate] = useState<boolean>(false);

  return (
    <div className="message-container">
      <span>{message.nickname} </span>
      {isShownDate && <span>{message.sendDate}</span>}
      <div key={index} onMouseOver={() => setIsShownDate(true)} onMouseOut={() => setIsShownDate(false)} className={"message fs-3 "}>
        {message.content}
      </div>
    </div>
  );
}

export default OthersMessageBox;
