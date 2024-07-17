import "./MessageForm.css";

interface ChatFormProps {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}

function MessageForm({ newMessage, setNewMessage, sendMessage }: ChatFormProps) {
  return (
    <form
      className="d-flex justify-content-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input type="text" className="form-control fn-1" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button className="btn btn-dark ms-4" onClick={sendMessage}>
        Send
      </button>
    </form>
  );
}

export default MessageForm;
