import { useEffect, useRef, useState, type FC } from "react";
import { ChatInput } from "../../features/chat/chat-input";
import { useGetSessionByIdQuery } from "../../features/query/session";
import { useAddChatMutation } from "../../features/query/chat";

type Props = {
  id?: string
}
export const ChatWindow:FC<Props> = ({id}) => {
  const [input, setInput] = useState("");
  const { data: messages = {chat: []} } = useGetSessionByIdQuery(id);
  const addMessage = useAddChatMutation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const message = input;
    setInput("");
    if (!isNaN(Number(id))) {
      await addMessage.mutateAsync({message: message, session_id: Number(id)});
    }
  };
  return (
    <div className="flex-1 flex flex-col h-full w-[80%] mx-auto">
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : ""}`}
          >
            <div
              className={`max-w-[50%] px-4 py-2 rounded-2xl break-words whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-[#2f2f2f] text-white"
              }`}
            >
              {msg.content}
            </div>

          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        isPending={addMessage.isPending}
      />
    </div>
  );
}