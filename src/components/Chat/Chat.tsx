import "./Chat.css";
import { Message } from "../../App";
import MessageBox from "./MessageBox";

function Chat({ messages }: { messages: Message[] }) {
  return (
    <div className="chat-container">
      {messages.map((message, index) => {
        let classValueContainer: string = "not-my-container";
        let classValueMessage: string = "not-my-message";
        if (message.userId === "chuj") {
          classValueContainer = "my-container";
          classValueMessage = "my-message";
        }
        return (
          <MessageBox classValueContainer={classValueContainer} classValueMessage={classValueMessage} message={message} index={index} />
        );
      })}
    </div>
  );
}

export default Chat;
