import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { socket } from "../../service/socket";

function AddFriend({ nickname }: { nickname: string }) {
  const [isFormShown, setIsFormShown] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const makeFriend = () => {
    const friendData = {
      name: "",
      usersArray: [nickname, name],
    };
    socket.emit("create:room", friendData);
    console.log(friendData);
    setIsFormShown(false);
  };

  return (
    <>
      <button className="btn btn-outline-light btn-lg  mx-auto mb-4" onClick={() => setIsFormShown(!isFormShown)}>
        Add Friend <span className="ms-2">{isFormShown ? "-" : "+"}</span>
      </button>

      {isFormShown && (
        <div className="input-group mb-5">
          <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

          <button className="btn btn-outline-secondary" type="button" onClick={makeFriend}>
            Add
          </button>
        </div>
      )}
    </>
  );
}

export default AddFriend;
