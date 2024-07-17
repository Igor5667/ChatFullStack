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
    <div className="message-container d-flex justify-content-end">
      <div>
        <div className="d-flex justify-content-end">
          {isShownDate && <span>{message.sendDate}</span>}
          <span className="text-end ms-2"> {message.nickname}</span>
        </div>
        <div
          key={index}
          onMouseOver={() => setIsShownDate(true)}
          onMouseOut={() => setIsShownDate(false)}
          className={"message fs-3 text-end"}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}

export default MyMessageBox;
