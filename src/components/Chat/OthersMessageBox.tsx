import React, { useState } from "react";
import "./Chat.css";
import { Message } from "../../App";

function OthersMessageBox({ message }: { message: Message }) {
  const [isShownDate, setIsShownDate] = useState<boolean>(false);

  return (
    <div className="message-container d-flex flex-column align-items-start">
      <div>
        <span>{message.nickname} </span>
        {isShownDate && <span>{message.sendDate}</span>}
      </div>

      <div onMouseOver={() => setIsShownDate(true)} onMouseOut={() => setIsShownDate(false)} className={"message other-message "}>
        {message.content}
      </div>
    </div>
  );
}

export default OthersMessageBox;
