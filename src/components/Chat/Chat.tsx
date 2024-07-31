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
          const isTheSamePerson = index > 0 && message.nickname === messages[index - 1].nickname;
          const isLastOfMessageChain = !(index < messages.length - 1 && message.nickname === messages[index + 1].nickname);
          const isFirstOfMessageChain =
            (index === 0 || message.nickname !== messages[index - 1].nickname) &&
            index < messages.length - 1 &&
            message.nickname === messages[index + 1].nickname;
          if (message.nickname === myNickname) {
            return (
              <MyMessageBox
                message={message}
                key={index}
                isTheSamePerson={isTheSamePerson}
                isLastOfMessageChain={isLastOfMessageChain}
                isFirstOfMessageChain={isFirstOfMessageChain}
              />
            );
          } else {
            return <OthersMessageBox message={message} key={index} />;
          }
        })}
      </div>
    </>
  );
}

export default Chat;
