import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { User } from "../../App";
import AddFriend from "../AddFriend/AddFriend";
import NewGroup from "../NewGroup/NewGroup";

function Sidebar({ users }: { users: User[] }) {
  return (
    <div className="sidebar  col-12 col-md-3 p-3 d-flex flex-column">
      <AddFriend />
      <NewGroup />

      <div className="ms-3 mt-2">
        <h2>Friends</h2>
        <ul className="fiernds-list">
          {users.map((user) => {
            return <li key={user.id}>{user.nickname}</li>;
          })}
        </ul>
        <h2>Groups</h2>
        <ul>
          <li>Papieżaki</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
