import { MessageCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SessionResponse } from "../../api/session/type";
import type { FC } from "react";
import { ROUTES } from "../../../app/router/config";

type Props = {
  sessionData?: SessionResponse;
  activeChat: number | null;
  setActiveChat: (value: number) => void;
}
export const ChatList:FC<Props> = ({sessionData, activeChat, setActiveChat}) => {
  const navigate = useNavigate();
  return (
    <div className="mt-2 mx-2 bg-[--primary-hover-color] py-2 rounded-2xl shadow-lg">
      <ul className="flex flex-col max-h-72 px-2 overflow-y-auto ">
        {/* Sessions */}
        {sessionData?.sessions?.length ? (
          sessionData.sessions.map((session) => (
            <li
              key={session.id}
              onClick={() => {
                navigate(`${ROUTES.Chat}/${session.id}`);
                setActiveChat(session.id);
              }}
              className={`
                group flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer
                transition-all
                ${
                  activeChat === session.id
                    ? "bg-white/15 border-l-4 border-blue-400"
                    : "hover:bg-white/10"
                }
              `}
            >
              <MessageCircle size={16} className="text-blue-300 shrink-0" />

              <span className="truncate text-sm">{session.title}</span>
            </li>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-gray-300">Пока нет чатов</div>
        )}
      </ul>
      <div className="my-2 border-t border-white/10" />
      <button
        onClick={() => navigate(`${ROUTES.Chat}/new`)}
        className="
          w-full
          flex items-center justify-center gap-2
          py-2 rounded-xl text-sm font-medium
          bg-blue-500 hover:bg-blue-600 transition
        "
      >
        <Plus size={16} />
        Новый чат
      </button>
    </div>
  );
};
