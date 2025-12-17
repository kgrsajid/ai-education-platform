import { useState, type FC } from "react";
import { useCreateChatMutation } from "../../features/query/chat";
import { useNavigate } from "react-router-dom";
import { ChatInput } from "../../features/chat/chat-input";

export const ChatEmpty:FC = () => {
  const [input, setInput] = useState("");
  const createChat = useCreateChatMutation();
  const navigate = useNavigate();
  const handleSend = async() => {
    const firstMessage = input;
    setInput("");
    const res = await createChat.mutateAsync({message: firstMessage});
    navigate(`/chat/${res.session_id}`, { replace: true });
    return;
  }
  return(
    <div className="flex flex-col flex-1 h-full items-center justify-center gap-6 mb-10">
      <h1 className="text-2xl text-black font-medium">
        What are you working on?
      </h1>
      <div className="w-full max-w-xl">
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          isPending={createChat.isPending}
        />
      </div>
    </div>
  );
}