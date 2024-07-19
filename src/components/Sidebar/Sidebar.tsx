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
  setCurrentRoom: React.Dispatch<React.SetStateAction<Room>>;
  myNickname: string;
}

function Sidebar({ rooms, setIsChatChoosen, setMessages, setCurrentRoom, myNickname }: Sidebar) {
  let friends: Room[] = [];
  let groups: Room[] = [];
  for (let room of rooms) {
    if (room.isGroup === true) {
      groups.push(room);
    } else {
      friends.push(room);
    }
  }

  const sendToken = async (room: any) => {
    setIsChatChoosen(true);
    setCurrentRoom(room);
    const response = await axios.post("http://172.16.61.119:3000/user/load-messages", { token: room.token });
    setMessages(response.data);
  };

  return (
    <div className="sidebar  col-12 col-md-3 p-3 d-flex flex-column">
      <AddFriend myNickname={myNickname} />
      <NewGroup />

      <div className="ms-3 mt-2">
        <h2>Friends</h2>
        <ul className="fiernds-list">
          {friends.map((friend, index) => {
            return (
              <li key={index} onClick={() => sendToken(friend)}>
                {friend.name}
              </li>
            );
          })}
        </ul>
        <h2>Groups</h2>
        <ul>
          {groups.map((group, index) => {
            return (
              <li key={index} onClick={() => sendToken(group)}>
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
