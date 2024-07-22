import axios from "axios";
import "./Profile.css";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

interface ProfileProps {
  myNickname: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  token: string;
}

function Profile({ myNickname, setToken, token }: ProfileProps) {
  const logout = async () => {
    const response = await axios.post("http://172.16.61.119:3000/room/create-room", { token });
    setToken("");
  };
  return (
    <div className="profile">
      <CgProfile className="profile-icon" />
      <div className="nickname">{myNickname}</div>
      <MdLogout className="logout-icon" onClick={logout} />
    </div>
  );
}

export default Profile;
