import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar  col-12 col-md-3 p-3">
      <h2>Friends</h2>
      <ul>
        <li>Hubert</li>
        <li>Kuba</li>
      </ul>
      <h2>Chats</h2>
      <ul>
        <li>Papieżaki</li>
      </ul>
    </div>
  );
}

export default Sidebar;
