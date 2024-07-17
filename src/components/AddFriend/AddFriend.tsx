import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function AddFriend() {
  const [isFormShown, setIsFormShown] = useState<boolean>(false);

  return (
    <>
      <button className="btn btn-outline-light btn-lg  mx-auto mb-4" onClick={() => setIsFormShown(!isFormShown)}>
        Add Friend <span className="ms-2">{isFormShown ? "-" : "+"}</span>
      </button>

      {isFormShown && (
        <div className="input-group mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />

          <button className="btn btn-outline-secondary" type="button" id="button-addon2">
            Add
          </button>
        </div>
      )}
    </>
  );
}

export default AddFriend;
