import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { socket } from "../../service/socket";

function MailBox({ inviteReqests, myNickname }: { inviteReqests: string[]; myNickname: string }) {
  const [isMailBoxShown, setIsMailBoxShown] = useState<boolean>(false);

  const acceptInvitation = (reciever: string) => {
    socket.emit("invite:accept", { sender: myNickname, reciever });
  };

  const declineInvitation = (reciever: string) => {
    socket.emit("invite:decline", { sender: myNickname, reciever });
  };

  return (
    <>
      <MdOutlineMail
        className="mail-icon"
        onClick={() => {
          setIsMailBoxShown(true);
        }}
      />
      {isMailBoxShown && (
        <div className="new-group-form-shadow">
          <div className="new-group-form">
            <h2 className="mb-4">MailBox</h2>
            {inviteReqests.map((name, index) => {
              return (
                <div key={index}>
                  {name} invited you <FaCheck color="green" onClick={() => acceptInvitation(name)} />
                  <IoMdRemoveCircleOutline color="red" onClick={() => declineInvitation(name)} />
                </div>
              );
            })}
            <button onClick={() => setIsMailBoxShown(false)}>back</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MailBox;
