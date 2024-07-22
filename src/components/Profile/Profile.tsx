import "./Profile.css";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

function Profile({ myNickname }: { myNickname: string }) {
  return (
    <div className="profile">
      <CgProfile className="profile-icon" />
      <div className="nickname">{myNickname}</div>
      <MdLogout className="logout-icon" />
    </div>
  );
}

export default Profile;
