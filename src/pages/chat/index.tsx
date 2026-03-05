import { useParams } from 'react-router-dom';
import { ChatEmpty } from '../../widgets/Chat/chat-empty';
import { ChatWindow } from '../../widgets/Chat/chat-window';
import { useState } from 'react';

export const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const isNewChat = id === 'new';
  const [firstMessage, setFirstMessage] = useState('');

  if (isNewChat) {
    return <ChatEmpty setFirstMessage={setFirstMessage} />;
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatWindow
        id={id}
        firstMesssage={firstMessage === '' ? undefined : firstMessage}
      />
    </div>
  );
};
