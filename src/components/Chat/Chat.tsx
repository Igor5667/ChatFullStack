import "./Chat.css";
import { Message } from "../../App";
import MyMessageBox from "./MyMessageBox";
import "bootstrap/dist/css/bootstrap.min.css";
import OthersMessageBox from "./OthersMessageBox";

function Chat({ messages, myNickname }: { messages: Message[]; myNickname: string }) {
  messages = [
    {
      nickname: "Max",
      content: "Hello world!",
      sendDate: "15:25 26.07.2024",
    },
    {
      nickname: "igor",
      content: "Another hello world!",
      sendDate: "15:25 26.07.2024",
    },
    {
      nickname: "Max",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt auctor interdum. Pellentesque pharetra sodales neque, at tincidunt erat congue a. Maecenas a tincidunt augue. In hac habitasse platea dictumst. Maecenas faucibus velit purus, vel efficitur justo interdum ut.",
      sendDate: "15:25 26.07.2024",
    },
    {
      nickname: "igor",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt auctor interdum. Pellentesque pharetra sodales neque, at tincidunt erat congue a. Maecenas a tincidunt augue. In hac habitasse platea dictumst. Maecenas faucibus velit purus, vel efficitur justo interdum ut.",
      sendDate: "15:25 26.07.2024",
    },
  ];

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
