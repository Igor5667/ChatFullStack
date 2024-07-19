import React, { useRef, useState } from "react";
import "./Chat.css";
import { Message } from "../../App";

function OthersMessageBox({ message }: { message: Message }) {
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
    <div className="message-container d-flex flex-column align-items-start">
      <div>
        <span>{message.nickname} </span>
        {isShownDate && <span>{message.sendDate}</span>}
      </div>

      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={"message other-message "}>
        {message.content}
      </div>
    </div>
  );
}

export default OthersMessageBox;
