import "./Chat.css";
import { Message } from "../../App";
import MyMessageBox from "./MyMessageBox";
import "bootstrap/dist/css/bootstrap.min.css";
import OthersMessageBox from "./OthersMessageBox";

export interface MessageChainStatusInterface {
  isTheSamePerson: boolean;
  isLastOfMessageChain: boolean;
  isFirstOfMessageChain: boolean;
}

function Chat({ messages, myNickname }: { messages: Message[]; myNickname: string }) {
  return (
    <>
      <div className="scroll-area">
        {messages.map((message, index) => {
          const messageChainStatus: MessageChainStatusInterface = {
            isTheSamePerson: index > 0 && message.nickname === messages[index - 1].nickname,
            isLastOfMessageChain: !(index < messages.length - 1 && message.nickname === messages[index + 1].nickname),
            isFirstOfMessageChain:
              (index === 0 || message.nickname !== messages[index - 1].nickname) &&
              index < messages.length - 1 &&
              message.nickname === messages[index + 1].nickname,
          };
          if (message.nickname === myNickname) {
            return <MyMessageBox message={message} key={index} messageChainStatus={messageChainStatus} />;
          } else {
            return <OthersMessageBox message={message} key={index} messageChainStatus={messageChainStatus} />;
          }
        })}
      </div>
    </>
  );
}

export default Chat;
