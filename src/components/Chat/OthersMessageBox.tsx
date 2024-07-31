import React, { useRef, useState } from "react";
import "./Chat.css";
import { Message } from "../../App";
import { MessageChainStatusInterface } from "./Chat";

function OthersMessageBox({
  message,
  messageChainStatus,
}: {
  message: Message;
  messageChainStatus: MessageChainStatusInterface;
}) {
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
    <div className="message-container d-flex flex-column align-items-start">
      <div>
        {!messageChainStatus.isTheSamePerson && <span>{message.nickname} </span>}
        {isShownDate && <span>{message.sendDate}</span>}
      </div>

      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={`message other-message ${messageChainStatus.isTheSamePerson && "same-person-messages-other"} ${
          messageChainStatus.isLastOfMessageChain && "last-of-message-chain-other"
        } ${messageChainStatus.isFirstOfMessageChain && "first-of-message-chain-other"}`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default OthersMessageBox;
