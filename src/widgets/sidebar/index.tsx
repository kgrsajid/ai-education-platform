import { SidebarCloseIcon } from "lucide-react";
import { useMemo, type Dispatch, type FC, type SetStateAction } from "react";
import { Tooltip } from "react-tooltip";
import { useGetSessionsQuery } from "../../features/query/session";
import { sidebarItems } from "./config";
import { useSidebar } from "./model/use-sidebar";
import { NavLink } from "react-router-dom";
import { ListSection } from "../../features/sidebar/list-type";
import { ROUTES } from "../../app/router/config";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { data: sessionData } = useGetSessionsQuery();
  const { isItemActive, isListActive } = useSidebar();
  const {t} = useTranslation();
  const sidebarItemsMemo = useMemo(() => {
    if (!sessionData) return sidebarItems;

    return sidebarItems.map((item) => {
      if (item.type === "list" && item.label === "sidebar.labels.chat") {
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
      className={`  dark:bg-slate-900 border-r border-slate-800 flex flex-col justify-between ${
        isOpen ? "w-64" : "w-16"
      } fixed z-10 left-0 top-0 h-screen flex flex-col transition-all duration-200`}
    >
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
                  className={`cursor-pointer mx-2 px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-3 ${
                    active ? "bg-[--primary-color] font-semibold" : ""
                  }`}
                >
                  <div className="flex gap-3 items-center justify-center">
                    <div className="pr-5">
                      {item.icon}
                    </div>
                    <div className={isOpen ? "" : "opacity-0"}>
                      {t(item.label)}
                    </div>
                  </div>
                </NavLink>
              );
            }
            if (item.type === "list") {
              const active = isListActive(
                [...item.list, { id: "new" }],
                ROUTES.Chat
              );
              return (
                <ListSection isOpen={isOpen} active={active} item={item} />
              );
            }
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
