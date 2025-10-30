import { useState, useEffect, useRef } from "react";
import { SendHorizonal, Bot, User } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Привет! Я твой AI-ассистент. Чем могу помочь?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Эмуляция ответа AI
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Ты сказал: "${input}". Интересно! 😊` },
      ]);
    }, 800);
  };

  // Автопрокрутка вниз при новых сообщениях
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Область сообщений */}
      <main className="h-full flex flex-col flex-1 p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >
            {msg.sender === "bot" && (
              <div className="p-2 bg-blue-600 rounded-full text-white">
                <Bot size={18} />
              </div>
            )}
            <div
              className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <div className="p-2 bg-blue-600 rounded-full text-white">
                <User size={18} />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Футер фиксированный внизу */}
      <footer className="p-4 bg-white border-t flex items-center gap-2 sticky bottom-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Введите сообщение..."
          className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          <SendHorizonal size={18} />
        </button>
      </footer>
    </div>
  );
};

export default Chat;
