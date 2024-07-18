import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { Room } from "../../App";
import { Message } from "../../App";
import AddFriend from "../AddFriend/AddFriend";
import NewGroup from "../NewGroup/NewGroup";
import axios from "axios";

interface Sidebar {
  rooms: Room[];
  setIsChatChoosen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setCurrentRoomToken: React.Dispatch<React.SetStateAction<string>>;
  nickname: string;
}

function Sidebar({ rooms, setIsChatChoosen, setMessages, setCurrentRoomToken, nickname }: Sidebar) {
  let friends: Room[] = [];
  let groups: Room[] = [];
  for (let room of rooms) {
    if (room.isGroup === true) {
      groups.push(room);
    } else {
      friends.push(room);
    }
  }

  const sendToken = async (roomToken: string) => {
    setIsChatChoosen(true);
    setCurrentRoomToken(roomToken);
    const response = await axios.post("http://172.16.61.119:3000/user/load-messages", { token: roomToken });
    setMessages(response.data);
  };

  return (
    <div className="sidebar  col-12 col-md-3 p-3 d-flex flex-column">
      <AddFriend nickname={nickname} />
      <NewGroup />

      <div className="ms-3 mt-2">
        <h2>Friends</h2>
        <ul className="fiernds-list">
          {friends.map((friend, index) => {
            return (
              <li key={index} onClick={() => sendToken(friend.token)}>
                {friend.name}
              </li>
            );
          })}
        </ul>
        <h2>Groups</h2>
        <ul>
          {groups.map((group, index) => {
            return (
              <li key={index} onClick={() => sendToken(group.token)}>
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
