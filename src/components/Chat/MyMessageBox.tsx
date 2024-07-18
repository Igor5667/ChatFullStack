import React, { useState } from "react";
import "./Chat.css";
import { Message } from "../../App";

function MyMessageBox({ message }: { message: Message }) {
  const [isShownDate, setIsShownDate] = useState<boolean>(false);

  return (
    <div className="message-container d-flex flex-column align-items-end">
      <div className="">
        {isShownDate && <span>{message.sendDate}</span>}
        <span className="text-end ms-2 "> {message.nickname}</span>
      </div>

      <div
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
