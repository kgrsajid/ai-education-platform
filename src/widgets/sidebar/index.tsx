import { Gamepad, MessageCircle, SidebarCloseIcon, TestTube, WalletCards } from "lucide-react";
import React, { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { Tooltip } from "react-tooltip";
import { useGetSessionsQuery } from "../../features/query/session";
import { ChatList } from "../../features/sidebar/chat/list";
import { ChatSection } from "../../features/sidebar/chat/section";

type Props = {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
};

const Sidebar: FC<Props> = ({ isOpen, setIsOpen }) => {
  const [chatOpen, setChatOpen] = useState(false); // для dropdown
  const { data: sessionData } = useGetSessionsQuery();
  const [activeChat, setActiveChat] = useState<null | number>(null);
  const menuItems = [
    { title: "Chat", icon: <MessageCircle size={23} />, id: 1 },
    { title: "Quiz", icon: <TestTube size={23} />, id: 2, to: "/quiz" },
    { title: "Games", icon: <Gamepad size={23} />, id: 3, to: "/games" },
    { title: "Cards", icon: <WalletCards size={23} />, id: 4, to: "/cards" },
  ];

  return (
    <aside
      className={`bg-[--primary-color] text-white ${
        isOpen ? "w-64" : "w-16"
      } fixed z-10 left-0 top-0 h-screen flex flex-col transition-all duration-200`}
    >
      {/* Кнопка сворачивания */}
      <div className="flex justify-end p-5 cursor-pointer">
        <SidebarCloseIcon
          data-tooltip-id="sidebar"
          data-tooltip-content={isOpen ? "close sidebar" : "open sidebar"}
          width={25}
          className={isOpen ? "" : "rotate-180"}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <Tooltip place="bottom" id="sidebar" />
      </div>

      {/* Меню */}
      <nav className="flex-1 mt-8">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
             <ChatSection
              isOpen={isOpen}
              chatOpen={chatOpen}
              sessionData={sessionData}
              item={item}
              setChatOpen={setChatOpen}
             />
              {item.title === "Chat" && chatOpen && isOpen && (
                <ChatList
                  activeChat={activeChat}
                  setActiveChat={setActiveChat}
                  sessionData={sessionData}
                />
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
