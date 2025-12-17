import { useParams } from "react-router-dom";
import { ChatEmpty } from "../../widgets/Chat/chat-empty";
import { ChatWindow } from "../../widgets/Chat/chat-window";


export const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const isNewChat = id === "new";


  if (isNewChat) {
    return (
      <ChatEmpty/>
    );
  }
  return (
    <div className="flex-1 flex flex-col h-full  w-[80%] mx-auto">
      <ChatWindow
        id={id}
      />
    </div>
  );
};

