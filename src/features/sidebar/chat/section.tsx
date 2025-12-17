import { ChevronDown } from "lucide-react";
import { useState, type FC, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import type { SessionResponse } from "../../api/session/type";

type Props = {
  item: {title: string, icon: JSX.Element, id: number, to?: string},
  setChatOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean;
  chatOpen: boolean;
  sessionData?: SessionResponse
}
export const ChatSection:FC<Props> = ({item, setChatOpen, isOpen, chatOpen, sessionData}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Chat");
  const handleTo = (item: { title: string; to?: string }) => {
    setActive(item.title);
    if (item.to) navigate(item.to);
  };
  return(
     <li
      onClick={() => {
        if (item.title === "Chat") {
          setChatOpen((prev) => !prev); 
          if (!sessionData?.sessions?.length) {
            navigate("/chat/new");
          }
        } else {
          handleTo(item);
        }
        setActive(item.title);
      }}
      className={`cursor-pointer px-6 py-2 rounded-2xl hover:bg-[--primary-hover-color] flex justify-between items-center gap-3 ${
        active === item.title ? "bg-[--primary-hover-color] font-semibold" : ""
      }`}
    >
      <div className="flex gap-3 items-center">
        {item.icon}
        <div className={isOpen ? "" : "opacity-0"}>{item.title}</div>
      </div>
      {item.title === "Chat" && isOpen && (
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${chatOpen ? "rotate-180" : ""}`}
        />
      )}
    </li>
  );
}