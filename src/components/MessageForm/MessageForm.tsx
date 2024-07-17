interface ChatFormProps {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}

function MessageForm({ newMessage, setNewMessage, sendMessage }: ChatFormProps) {
  return (
    <form
      className="flex align-items-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button className="btn-primary" onClick={sendMessage}>
        Send
      </button>
    </form>
  );
}

export default MessageForm;
