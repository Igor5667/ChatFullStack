import "./Chat.css";
import { Message } from "../../App";
import MyMessageBox from "./MyMessageBox";
import "bootstrap/dist/css/bootstrap.min.css";
import OthersMessageBox from "./OthersMessageBox";

function Chat({ messages, nickname }: { messages: Message[]; nickname: string }) {
  return (
    <div className="scroll-area">
      {messages.map((message, index) => {
        if (message.nickname === nickname) {
          return <MyMessageBox message={message} index={index} />;
        } else {
          return <OthersMessageBox message={message} index={index} />;
        }
      })}
    </div>
  );
}

export default Chat;
