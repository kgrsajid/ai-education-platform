import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatInput } from '../../features/chat/chat-input';
import { ROUTES } from '../../app/router/config';
import { useTranslation } from 'react-i18next';
import { useCreateSessionMutation } from '../../features/query/session';

const SUGGESTED_TOPICS = [
  'Explain React hooks',
  'Python list comprehensions',
  'What is Big O notation?',
  'JavaScript async/await',
];

type Props = {
  setFirstMessage: Dispatch<SetStateAction<string>>;
};

export const ChatEmpty: FC<Props> = ({ setFirstMessage }) => {
  const createChat = useCreateSessionMutation();
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [isActiveMode, setIsActiveMode] = useState(false);
  const navigate = useNavigate();

  const handleSend = async (override?: string) => {
    const firstMessage = override ?? input;
    if (!firstMessage.trim()) return;
    setFirstMessage(firstMessage);
    setInput('');
    const res = await createChat.mutateAsync();
    if (res) {
      navigate(`${ROUTES.Chat}/${res.data?.id}`, {
        replace: true,
        state: { message: firstMessage },
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Centered welcome area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        {/* Icon + heading */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 36 }}>
              auto_awesome
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-white mb-2">
              {t('chat.phrases.empty-title')}
            </h1>
            <p className="text-slate-400 text-base max-w-md leading-relaxed">
              Your AI-powered learning companion. Ask me anything about your studies.
            </p>
          </div>
        </div>

        {/* Suggested topics */}
        <div className="flex flex-wrap gap-2 justify-center max-w-lg">
          {SUGGESTED_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setInput(topic)}
              className="text-xs bg-slate-800 hover:bg-primary/20 hover:text-primary px-4 py-2 rounded-full text-slate-400 font-medium transition-all border border-slate-700 hover:border-primary/30"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Input pinned at bottom */}
      <ChatInput
        isActiveMode={isActiveMode}
        handleChangeActiveMode={() => setIsActiveMode((p) => !p)}
        input={input}
        setInput={setInput}
        handleSend={() => handleSend()}
        isPending={createChat.isPending}
      />
    </div>
  );
};
