import { useState, type FC } from "react"
import type { ListSidebar } from "../../../widgets/sidebar/type/type"
import { ChevronDown } from "lucide-react"
import { ChatList } from "../chat/list"
import { ROUTES } from "../../../app/router/config"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

type Props = {
  item: ListSidebar,
  active: boolean,
  isOpen: boolean
}
export const ListSection:FC<Props> = ({item, active, isOpen}) => {
  const [open, setIsOpen] = useState(active);
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <div key={item.label}>
      <div
        onClick={() => {
          if (item.label === "sidebar.labels.chat") {
            setIsOpen((prev) => !prev); 
            if (!item.list.length && !open) {
              navigate(`${ROUTES.Chat}/new`);
            }else if(!open){
              navigate(`${ROUTES.Chat}/${item.list[0].id}`)
            }
          }
        }}
        className={`cursor-pointer mx-2 px-3 py-2 rounded-lg hover:bg-[--primary-color] flex justify-between items-center gap-3 ${
          active ? "bg-[--primary-color] font-semibold" : ""
        }`}
      >
        <div className="flex gap-3 items-center">
          <div className="pr-5">
            {item.icon}
          </div>
          <div className={isOpen ? "" : "opacity-0 pointer-events-none"}>{t(item.label)}</div>
        </div>
        {
          isOpen && <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />
        }
      </div>
        { open && isOpen && (
          <ChatList
            list={item.list}
          />
        )}
    </div>
  )
}