import "./Chat.css";
import { Message } from "../../App";
import MyMessageBox from "./MyMessageBox";
import "bootstrap/dist/css/bootstrap.min.css";
import OthersMessageBox from "./OthersMessageBox";

function Chat({ messages, myNickname }: { messages: Message[]; myNickname: string }) {
  return (
    <>
      <div className="scroll-area">
        {messages.map((message, index) => {
          if (message.nickname === myNickname) {
            return <MyMessageBox message={message} key={index} />;
          } else {
            return <OthersMessageBox message={message} key={index} />;
          }
        })}
      </div>
    </>
  );
}

export default Chat;
