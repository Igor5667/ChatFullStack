import axios from "axios";
import "./Profile.css";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import MailBox from "../MailBox/MailBox";

interface ProfileProps {
  myNickname: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  inviteReqests: string[];
  setInviteRequests: React.Dispatch<React.SetStateAction<string[]>>;
}

function Profile({ myNickname, setToken, token, inviteReqests, setInviteRequests }: ProfileProps) {
  const logout = async () => {
    const response = await axios.post("http://172.16.61.119:3000/room/create-room", { token });
    setToken("");
  };

  return (
    <div className="profile">
      <MdLogout className="logout-icon" onClick={logout} />
      <MailBox inviteReqests={inviteReqests} setInviteRequests={setInviteRequests} myNickname={myNickname} />

      <div className="nickname ms-4">{myNickname}</div>
      <CgProfile className="profile-icon" />
      {/* <div className="kolko"></div> */}
    </div>
  );
}

export default Profile;
