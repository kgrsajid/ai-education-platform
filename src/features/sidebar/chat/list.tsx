import { MessageCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";
import { ROUTES } from "../../../app/router/config";
import { useSidebar } from "../../../widgets/sidebar/model/use-sidebar";
import { useTranslation } from "react-i18next";

type Props = {
  list?: {label: string; id: string}[];
}
export const ChatList:FC<Props> = ({list}) => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {isListSubActive} = useSidebar();
  return (
    <div className="mt-2 mx-2 bg-[--primary-color] py-2 rounded-lg shadow-lg">
      <ul className="flex flex-col max-h-72 px-2 overflow-y-auto ">
        {/* Sessions */}
        {list?.length ? (
          list.map((session) => {
            const active = isListSubActive(session.id, ROUTES.Chat);
            return <li
              key={session.id}
              onClick={() => {
                navigate(`${ROUTES.Chat}/${session.id}`);
              }}
              className={`
                group flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                transition-all
                ${
                  active
                    ? "bg-white/15 border-l-4 border-blue-500"
                    : "hover:bg-white/10"
                }
              `}
            >
              <MessageCircle size={16} className="text-blue-500 shrink-0" />

              <span className="truncate text-sm">{session.label}</span>
            </li>
          })
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
          bg-[--primary-color] hover:bg-blue-600 transition
        "
      >
        <Plus size={16} />
        {t("chat.phrases.new-chat")}
      </button>
    </div>
  );
};
