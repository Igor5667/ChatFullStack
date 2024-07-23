import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { useState } from "react";
import axios from "axios";
import { Room } from "../../App";
import { Message } from "../../App";
import { socket } from "../../service/socket";
import AddFriend from "../AddFriend/AddFriend";
import NewGroup from "../NewGroup/NewGroup";

interface Sidebar {
  rooms: Room[];
  setIsChatChoosen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>;
  myNickname: string;
  scrollToBottom: () => void;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  token: string;
}

function Sidebar({ rooms, setIsChatChoosen, setMessages, setCurrentRoom, myNickname, scrollToBottom, setToken, token }: Sidebar) {
  const rooms1: Room[] = [
    { token: "1", name: "Andrzej", isGroup: false },
    { token: "sjefadf", name: "Fałstyn", isGroup: false },
    { token: "2", name: "Papierzaki", isGroup: true },
    { token: "3", name: "Kryspin", isGroup: false },
    { token: "4", name: "Room 1", isGroup: true },
    { token: "5", name: "Room 2", isGroup: true },
    { token: "6", name: "Room 3", isGroup: true },
  ];

  let friends: Room[] = [];
  let groups: Room[] = [];

  for (let room of rooms) {
    if (room.isGroup === true) {
      groups.push(room);
    } else {
      friends.push(room);
    }
  }

  const [friendsDynamic, setFriendsDynamic] = useState<Room[]>(friends);
  const [groupsDynamic, setGroupsDynamic] = useState<Room[]>(groups);

  const pushToFriends = (newFriend: string) => {
    setFriendsDynamic((friendsDynamic) => [...friendsDynamic, { token: "", name: newFriend, isGroup: false }]);
  };

  const getCurrentChatMessages = async (room: any) => {
    const response = await axios.post("http://172.16.61.119:3000/user/load-messages", { token: room.token });
    socket.emit("joinRoom", { token: room.token });

    console.log("GET CURRENT CHAT MESSAGES");
    console.log(response.data);

    setIsChatChoosen(true);
    setCurrentRoom(room);
    setMessages(response.data);
    scrollToBottom();
  };

  return (
    <div className="sidebar  col-12 col-md-3 p-3 d-flex flex-column">
      <AddFriend myNickname={myNickname} pushToFriends={pushToFriends} />
      <NewGroup />
      <div className="ms-3 mt-2">
        <h2>Friends</h2>
        <ul className="fiernds-list">
          {friendsDynamic.map((friend, index) => {
            return (
              <li key={index} onClick={() => getCurrentChatMessages(friend)}>
                {friend.name}
              </li>
            );
          })}
        </ul>
        <h2>Groups</h2>
        <ul>
          {groupsDynamic.map((group, index) => {
            return (
              <li key={index} onClick={() => getCurrentChatMessages(group)}>
                {group.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
