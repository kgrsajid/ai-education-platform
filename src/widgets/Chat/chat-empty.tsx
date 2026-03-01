import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { ChatInput } from "../../features/chat/chat-input";
import { ROUTES } from "../../app/router/config";
import { useTranslation } from "react-i18next";
import { useCreateSessionMutation } from "../../features/query/session";

type Props = {
  setFirstMessage: Dispatch<SetStateAction<string>>;
}
export const ChatEmpty:FC<Props> = ({setFirstMessage}) => {
  
  const createChat = useCreateSessionMutation();
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [isActiveMode, setIsActiveMode] = useState(false);
   const handleChangeActiveMode = () => {
    setIsActiveMode(prev => !prev);
  }
  const handleSend = async() => {
    const firstMessage = input;
    setFirstMessage(firstMessage);
    setInput("");
    const res = await createChat.mutateAsync();
    if (res) {
      console.log(res);
      navigate(`${ROUTES.Chat}/${res.data?.id}`, { replace: true, state: {message: firstMessage} });
    }
    return;
  }
  return(
    <div className="flex flex-col flex-1 h-full items-center justify-center gap-6 mb-10">
      <h1 className="text-2xl text-black font-medium">
        {t("chat.phrases.empty-title")}
      </h1>
      <div className="w-full max-w-xl">
        <ChatInput
          isActiveMode={isActiveMode}
          handleChangeActiveMode={handleChangeActiveMode}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          isPending={createChat.isPending}
        />
      </div>
    </div>
  );
}