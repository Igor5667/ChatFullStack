import React, { useRef, useState } from "react";
import "./Chat.css";
import { Message } from "../../App";

function MyMessageBox({ message }: { message: Message }) {
  const [isShownDate, setIsShownDate] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseOver = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsShownDate(true);
    }, 500);
  };

  const handleMouseOut = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current); // Wyczyść timeout jeśli istnieje
    }
    setIsShownDate(false);
  };

  return (
    <div className="message-container d-flex flex-column align-items-end">
      <div className="">
        {isShownDate && <span>{message.sendDate}</span>}
        <span className="text-end ms-2 "> {message.nickname}</span>
      </div>

      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={"message my-message ms-5"}>
        {message.content}
      </div>
    </div>
  );
}

export default MyMessageBox;
