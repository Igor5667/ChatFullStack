import React, { useRef, useState } from "react";
import "./Chat.css";
import { Message } from "../../App";

interface MyMessageBoxProps {
  message: Message;
  isTheSamePerson: boolean;
  isLastOfMessageChain: boolean;
  isFirstOfMessageChain: boolean;
}

function MyMessageBox({ message, isTheSamePerson, isLastOfMessageChain, isFirstOfMessageChain }: MyMessageBoxProps) {
  const [isShownDate, setIsShownDate] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseOver = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsShownDate(true);
    }, 500);
  };

  const handleMouseOut = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    setIsShownDate(false);
  };

  return (
    <div className="message-container d-flex flex-column align-items-end">
      <div className="">
        {isShownDate && <span>{message.sendDate}</span>}
        {!isTheSamePerson && <span className="text-end ms-2 "> {message.nickname}</span>}
      </div>

      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={`message my-message ms-5 ${isTheSamePerson && "same-person-messages"} ${
          isLastOfMessageChain && "last-of-message-chain"
        } ${isFirstOfMessageChain && "first-of-message-chain"}`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default MyMessageBox;
