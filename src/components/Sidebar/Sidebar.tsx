import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { User } from "../../App";
import AddFriend from "../AddFriend/AddFriend";

function Sidebar({ users }: { users: User[] }) {
  return (
    <div className="sidebar  col-12 col-md-3 p-3 d-flex flex-column">
      <AddFriend />

      <button className="btn btn-outline-light btn-lg  mx-auto mb-4">
        New Group <span className="ms-2">+</span>
      </button>
      <div className="ms-3 mt-2">
        <h2>Friends</h2>
        <ul>
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
