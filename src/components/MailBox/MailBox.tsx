import { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { socket } from "../../service/socket";
import "./MailBox.css";
import { Room } from "../../App";
import axios from "axios";

interface MailBoxProps {
  inviteReqests: string[];
  myNickname: string;
  setInviteRequests: React.Dispatch<React.SetStateAction<string[]>>;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

function MailBox({ inviteReqests, myNickname, setInviteRequests, setRooms }: MailBoxProps) {
  const [isMailBoxShown, setIsMailBoxShown] = useState<boolean>(false);

  const handleInvitation = async (receiver: string, method: string) => {
    socket.emit(`invite:${method}`, { sender: myNickname, receiver });
    const filteredReqests = inviteReqests.filter((invitation) => invitation !== receiver);
    setInviteRequests(filteredReqests);
  };

  const loadNotifications = async () => {
    socket.emit("invite:load", myNickname);
  };

  return (
    <>
      {inviteReqests.length === 0 ? (
        <IoMailOutline
          className="mail-icon"
          onClick={() => {
            setIsMailBoxShown(true);
            loadNotifications();
          }}
        />
      ) : (
        <IoMailUnreadOutline
          className="mail-icon"
          onClick={() => {
            setIsMailBoxShown(true);
            loadNotifications();
          }}
        />
      )}

      {isMailBoxShown && (
        <div className="mail-box-shadow">
          <div className="mail-box">
            <h2 className="mb-4">MailBox</h2>
            {inviteReqests.map((name, index) => {
              return (
                <div key={index} className="invitation">
                  <div>{name} invited you </div>
                  <button className="button-icon ms-auto btn btn-outline-light" onClick={() => handleInvitation(name, "accept")}>
                    <FaCheck />
                  </button>
                  <button
                    className="button-icon cross ms-2 btn btn-outline-light"
                    onClick={() => handleInvitation(name, "decline")}
                  >
                    <CgClose className="cross" />
                  </button>
                </div>
              );
            })}
            <button className="mt-auto btn btn-outline-light btn-lg" onClick={() => setIsMailBoxShown(false)}>
              back
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MailBox;
