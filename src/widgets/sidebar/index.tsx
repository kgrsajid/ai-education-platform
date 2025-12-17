import { SidebarCloseIcon } from "lucide-react";
import { useMemo, type Dispatch, type FC, type SetStateAction } from "react";
import { Tooltip } from "react-tooltip";
import { useGetSessionsQuery } from "../../features/query/session";
import { sidebarItems } from "./config";
import { useSidebar } from "./model/use-sidebar";
import { NavLink } from "react-router-dom";
import { ListSection } from "../../features/sidebar/list-type";
import { ROUTES } from "../../app/router/config";

type Props = {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
};

const Sidebar: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { data: sessionData } = useGetSessionsQuery();
  const {isItemActive, isListActive} = useSidebar();
  const sidebarItemsMemo = useMemo(() => {
    if (!sessionData) return sidebarItems;

    return sidebarItems.map((item) => {
      if (item.type === "list" && item.label === "Chat") {
        return {
          ...item,
          list: sessionData.sessions.map((s) => ({
            label: s.title,
            id: s.id.toString(),
          })),
        };
      }

      return item;
    });
  }, [sessionData]);

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
          {sidebarItemsMemo.map((item) => {
            if (item.type === "item") {
              const active = isItemActive(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`cursor-pointer px-6 py-2 rounded-2xl hover:bg-[--primary-hover-color] flex justify-between items-center gap-3 ${
                    active ? "bg-[--primary-hover-color] font-semibold" : ""
                  }`}
                >
                  <div className="flex gap-3 items-center">
                    {item.icon}
                    <div className={isOpen ? "" : "opacity-0"}>{item.label}</div>
                  </div>
                </NavLink>
              );
            }
            if (item.type === "list") {
              const active = isListActive([...item.list, {id: "new"}], ROUTES.Chat);
              return <ListSection isOpen={isOpen} active={active} item={item}/>
            }

          }
            // <React.Fragment key={item.label}>
            //  <ChatSection
            //   isOpen={isOpen}
            //   chatOpen={chatOpen}
            //   sessionData={sessionData}
            //   item={item}
            //   setChatOpen={setChatOpen}
            //  />
            //   {item.title === "Chat" && chatOpen && isOpen && (
            //     <ChatList
            //       activeChat={activeChat}
            //       setActiveChat={setActiveChat}
            //       sessionData={sessionData}
            //     />
            //   )}
            // </React.Fragment>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
