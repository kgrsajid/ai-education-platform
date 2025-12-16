import { Gamepad, MessageCircle, SidebarCloseIcon, TestTube, WalletCards } from "lucide-react";
import React, { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

type Props = {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
}
const Sidebar:FC<Props> = ({isOpen, setIsOpen}) => {
  const [active, setActive] = useState("Chat");
  const navigate = useNavigate();

  const menuItems = [
    { title: "Chat", icon: <MessageCircle size={23} />, id: 1, to: "/chat" },
    { title: "Quiz", icon: <TestTube size={23} />, id: 2, to: "/quiz" },
    { title: "Games", icon: <Gamepad size={23} />, id: 3, to: "/games" },
    { title: "Cards", icon: <WalletCards size={23} />, id: 4, to: "/cards" },
  ];

  const handleTo = (item: {title: string, to: string}) => {
    setActive(item.title);
    navigate(item.to);
  };

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
        <ul className="flex flex-col">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleTo(item)}
              className={`cursor-pointer pl-6 py-3 hover:bg-[--primary-hover-color] flex gap-3 items-center ${
                active === item.title
                  ? "bg-[--primary-hover-color] font-semibold"
                  : ""
              }`}
            >
              <div>{item.icon}</div>
              <div className={isOpen ? "" : "opacity-0"}>{item.title}</div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
