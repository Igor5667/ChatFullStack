import axios from "axios";
import "./Profile.css";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import MailBox from "../MailBox/MailBox";
import { Room } from "../../App";

interface ProfileProps {
  myNickname: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  inviteReqests: string[];
  setInviteRequests: React.Dispatch<React.SetStateAction<string[]>>;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

function Profile({ myNickname, setToken, token, inviteReqests, setInviteRequests, setRooms }: ProfileProps) {
  const logout = async () => {
    // const response = await axios.post("http://172.16.61.119:18353/room/create-room", { token }); //with server 
    setToken("");
  };

  return (
    <div className="profile">
      <MdLogout className="logout-icon" onClick={logout} />
      <MailBox inviteReqests={inviteReqests} setInviteRequests={setInviteRequests} myNickname={myNickname} setRooms={setRooms} />

      <div className="nickname ms-4">{myNickname}</div>

      <CgProfile className="profile-icon" />
    </div>
  );
}

export default Profile;
