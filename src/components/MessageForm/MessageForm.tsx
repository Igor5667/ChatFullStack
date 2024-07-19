import "./MessageForm.css";
import { GrSend } from "react-icons/gr";

interface ChatFormProps {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}

function MessageForm({ newMessage, setNewMessage, sendMessage }: ChatFormProps) {
  return (
    <form
      className="chat-form d-flex justify-content-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        className="form-control fn-1"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="type here..."
      />
      <button className="btn btn-outline-light ms-4" onClick={sendMessage}>
        <GrSend size={25} />
      </button>
    </form>
  );
}

export default MessageForm;
