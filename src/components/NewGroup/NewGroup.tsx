import "bootstrap/dist/css/bootstrap.min.css";
import { HiMiniUserGroup } from "react-icons/hi2";
import "./NewGroup.css";
import { useState } from "react";

function NewGroup() {
  const [isFormShown, setIsFormShown] = useState<boolean>(false);
  const [isListShown, setIsListShown] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersToSend, setUsersToSend] = useState<string[]>([]);
  const users = ["Kuba", "Krystian", "Hubert"];

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => user.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleListItem = (user: string) => {
    console.log("hejka");
    setUsersToSend((usersToSend) => [...usersToSend, user]);
    setSearchTerm("");
    setIsListShown(false);
  };

  return (
    <>
      <button className="btn btn-outline-light btn-lg  mx-auto mb-4" onClick={() => setIsFormShown(!isFormShown)}>
        New Group{" "}
        <span className="ms-2">
          <HiMiniUserGroup />
        </span>
      </button>

      {isFormShown && (
        <div className="new-group-form-shadow">
          <div className="new-group-form">
            <h2 className="mb-4">Add New Group</h2>
            <input type="text" className="form-control w-75 mx-auto mb-4" placeholder="Name" />
            <input
              type="text"
              className="form-control w-75 mx-auto "
              value={searchTerm}
              onFocus={() => setIsListShown(true)}
              onChange={(e) => handleChange(e)}
              //   onKeyUp={(e)=>}
              placeholder="Friends"
            />

            {isListShown && (
              <div className="scroll-area w-75">
                <ul className="list-group">
                  {filteredUsers.map((user, index) => {
                    if (usersToSend.includes(user)) {
                      console.log(usersToSend);
                      return;
                    }
                    return (
                      <li
                        className="list-group-item list-group-item-action"
                        onClick={() => {
                          handleListItem(user);
                        }}
                        key={index}
                      >
                        {user}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <ul>
              {usersToSend.map((user) => (
                <li>{user}</li>
              ))}
            </ul>
            <div className="d-flex space-between w-100">
              <button>Back</button>
              <button>Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewGroup;
