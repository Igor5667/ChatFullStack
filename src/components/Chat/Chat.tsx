import "./Chat.css";
import { Message } from "../../App";
import MyMessageBox from "./MyMessageBox";
import "bootstrap/dist/css/bootstrap.min.css";
import OthersMessageBox from "./OthersMessageBox";
import moment from "moment";

export interface MessageChainStatusInterface {
  isTheSamePerson: boolean;
  isLastOfMessageChain: boolean;
  isFirstOfMessageChain: boolean;
}

function Chat({ messages, myNickname }: { messages: Message[]; myNickname: string }) {
  messages = messages.map((message) => {
    // Przekonwertuj string na obiekt momentJS
    const sendDate = moment(message.sendDate);
    const now = moment();
    const isToday = sendDate.isSame(now, "day");
    const isCurrentYear = sendDate.isSame(now, "year");
    const daysDifference = now.diff(sendDate, "days");

    let format;
    if (isToday) {
      format = "HH:mm";
    } else if (daysDifference > 7) {
      format = isCurrentYear ? "HH:mm DD.MM" : "HH:mm DD.MM.YYYY";
    } else {
      format = "dddd HH:mm";
    }

    return {
      ...message,
      sendDate: sendDate.format(format),
    };
  });

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
