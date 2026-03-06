import { useEffect, useRef, useState, type FC } from 'react';
import { ChatInput } from '../../features/chat/chat-input';
import { ChatMessage } from '../../features/chat/chat-message';
import { ChatTypingIndicator } from '../../features/chat/chat-typing-indicator';
import { useGetSessionByIdQuery } from '../../features/query/session';
import { useAddChatMutation, useRetryLastMessage } from '../../features/query/chat';
import { useAuth } from '../../providers/context/const/const';
import { StatusEnum } from '../../features/api/session/type';

type Props = {
  id?: string;
  firstMesssage?: string;
};

export const ChatWindow: FC<Props> = ({ id, firstMesssage }) => {
  const [input, setInput] = useState('');
  const [isBotThink, setIsBotThink] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSummaryMode, setIsSummaryMode] = useState(false);

  const { data: messages = { chat: [] }, refetch } = useGetSessionByIdQuery(id);
  const retryLastMessage = useRetryLastMessage();
  const addMessage = useAddChatMutation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { token } = useAuth();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotThink]);

  useEffect(() => {
    const hasError = messages.chat.some((m) => m.status === StatusEnum.Error);
    setIsError(hasError);
  }, [messages.chat]);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(
      `ws://localhost:8082/message?token=${token}&session_id=${id}&summary=${Number(isSummaryMode)}`,
    );
    wsRef.current = ws;

    ws.onopen = () => {
      if (firstMesssage) ws.send(firstMesssage);
    };

    ws.onmessage = (event: MessageEvent) => {
      const role = JSON.parse(event.data);
      if (role === 'bot') setIsBotThink(false);
      if (role === 'user') setIsBotThink(true);
      refetch();
    };

    ws.onclose = (e) => console.log('WS closed', e);
    ws.onerror = (err) => console.error('WS error:', err);

    return () => ws.close();
  }, [token, id, isSummaryMode]);

  const handleSend = () => {
    if (!input.trim()) return;
    const message = input;
    setInput('');
    if (id && wsRef.current) {
      wsRef.current.send(message);
    }
  };

  const handleRetry = async () => {
    if (id) {
      await retryLastMessage.mutateAsync(id);
      setIsError(false);
    }
  };


  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">

      {/* Messages area — flex-1 + min-h-0 позволяет overflow-y-auto работать в flex */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto py-6 space-y-6">
          {messages.chat.map((msg, index) => (
            <ChatMessage key={msg.id || index} message={msg} />
          ))}

          {/* Error banner */}
          {isError && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-red-400">error</span>
                <span className="text-red-400 text-sm">
                  Something went wrong. Try sending the message again.
                </span>
              </div>
              <button
                onClick={handleRetry}
                className="p-2 rounded-lg hover:bg-red-500/20 transition text-red-400"
                title="Retry"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
              </button>
            </div>
          )}

          {isBotThink && !isError && <ChatTypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input — shrink-0 уже задан внутри ChatInput */}
      <ChatInput
        isSummaryMode={isSummaryMode}
        handleChangeSummaryMode={() => setIsSummaryMode((p) => !p)}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        isPending={addMessage.isPending || isError}
      />
    </div>
  );
};
