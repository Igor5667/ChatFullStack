import React, { useState } from "react";
import "./Chat.css";
import { Message } from "../../App";

interface MessageBox {
  message: Message;
  index: number;
}

function MyMessageBox({ message, index }: MessageBox) {
  const [isShownDate, setIsShownDate] = useState<boolean>(false);

  return (
    <div className="message-container d-flex flex-column align-items-end">
      <div className="">
        {isShownDate && <span>{message.sendDate}</span>}
        <span className="text-end ms-2 "> {message.nickname}</span>
      </div>

      <div
        key={index}
        onMouseOver={() => setIsShownDate(true)}
        onMouseOut={() => setIsShownDate(false)}
        className={"message my-message ms-5"}
      >
        {message.content}
      </div>
    </div>
  );
}

export default MyMessageBox;
