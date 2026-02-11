import { useEffect, useRef, useState, type FC } from "react";
import { ChatInput } from "../../features/chat/chat-input";
import { useGetSessionByIdQuery } from "../../features/query/session";
import { useAddChatMutation, useRetryLastMessage } from "../../features/query/chat";
import { useAuth } from "../../providers/context/const/const";
import { StatusEnum } from "../../features/api/session/type";
import { CircleAlert, RefreshCcw } from "lucide-react";

type Props = {
  id?: string;
  firstMesssage?: string;
}
export const ChatWindow:FC<Props> = ({id, firstMesssage}) => {
  const [input, setInput] = useState("");
  const [isBotThink, setIsBotThink] = useState(false);
  const [isError, setIsError] = useState(false);
  const { data: messages = {chat: []}, refetch } = useGetSessionByIdQuery(id);

  const retryLastMessage = useRetryLastMessage();
  const [isActiveMode, setIsActiveMode] = useState(false);
  const addMessage = useAddChatMutation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { token } = useAuth();
  const wsRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    console.log(isBotThink);
  }, [isBotThink]);
  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`ws://localhost:8082/message?token=${token}&session_id=${id}&summary=${Number(isActiveMode)}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WS connected");
      if (firstMesssage) {
        ws.send(firstMesssage);
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      const role  = JSON.parse(event.data);
      if(role == "bot") {
        setIsBotThink(false);
      }
      if(role == "user") {
        setIsBotThink(true);
      }
      refetch();
    };

    ws.onclose = (e) => console.log("WS closed", e);
    ws.onerror = (err) => console.error("WS error:", err);

    return () => {
      ws.close();
    };
  }, [token, id, isActiveMode]);


  

  const handleSend = async () => {
    if (!input.trim()) return;
    const message = input;
    setInput("");
    if (id && wsRef.current) {
      wsRef.current.send(message);
    }
  };

  const handleRetry = async() => {
    if( id ) {
      retryLastMessage.mutateAsync(id);
      setIsError(false);
    }
  }

  const handleChangeActiveMode = () => {
    setIsActiveMode(prev => !prev);
  }
  return (
    <div className="flex-1 flex flex-col h-full w-[80%] mx-auto">
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.chat.map((msg, index) => {
          setIsError(msg.status === StatusEnum.Error);
          return (
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
          )
        })}
        {isError && (
          <div className="flex items-center justify-between p-4 rounded-3xl bg-red-100 border border-red-300 shadow-sm">
            <div className="flex items-center gap-3">
              <CircleAlert className="text-red-500 w-5 h-5" />
              <span className="text-red-700 text-sm">
                Something went wrong. Try sending the message again.
              </span>
            </div>

            <button
              onClick={handleRetry}
              className="p-2 rounded-full hover:bg-red-100 transition"
              title="Retry"
            >
              <RefreshCcw className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}

        {isBotThink && !isError && (
          <div
            className="inline-flex px-4 py-2 rounded-2xl break-words whitespace-pre-wrap bg-[#2f2f2f] text-white"
          >
            <div className="flex space-x-1">
              <span className="dot animate-bounce">.</span>
              <span className="dot animate-bounce animation-delay-200">.</span>
              <span className="dot animate-bounce animation-delay-400">.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      <ChatInput
        isActiveMode={isActiveMode}
        handleChangeActiveMode={handleChangeActiveMode}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        isPending={addMessage.isPending || isError}
      />
    </div>
  );
}