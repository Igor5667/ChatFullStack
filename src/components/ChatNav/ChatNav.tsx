import React from "react";
import { IoMenu } from "react-icons/io5";
import "./ChatNav.css";
import { Room } from "../../App";

function ChatNav({ currentRoom }: { currentRoom: Room }) {
  return (
    <div className="chat-nav ps-5">
      <div>{currentRoom.name}</div>
      <div>
        <IoMenu />
      </div>
    </div>
  );
}

export default ChatNav;
