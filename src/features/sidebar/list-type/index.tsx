import { useState, type FC } from "react"
import type { ListSidebar } from "../../../widgets/sidebar/type/type"
import { ChevronDown } from "lucide-react"
import { ChatList } from "../chat/list"
import { ROUTES } from "../../../app/router/config"
import { useNavigate } from "react-router-dom"

type Props = {
  item: ListSidebar,
  active: boolean,
  isOpen: boolean
}
export const ListSection:FC<Props> = ({item, active, isOpen}) => {
  const [open, setIsOpen] = useState(active);
  const navigate = useNavigate();
  return (
    <div key={item.label}>
      <div
        onClick={() => {
          if (item.label === "Chat") {
            setIsOpen((prev) => !prev); 
            if (!item.list.length) {
              navigate(`${ROUTES.Chat}/new`);
            }else {
              navigate(`${ROUTES.Chat}/${item.list[0].id}`)
            }
          }
        }}
        className={`cursor-pointer px-6 py-2 rounded-2xl hover:bg-[--primary-hover-color] flex justify-between items-center gap-3 ${
          active ? "bg-[--primary-hover-color] font-semibold" : ""
        }`}
      >
        <div className="flex gap-3 items-center">
          {item.icon}
          <div className={isOpen ? "" : "opacity-0"}>{item.label}</div>
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