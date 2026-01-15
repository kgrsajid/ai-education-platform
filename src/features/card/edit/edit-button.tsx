import { EditIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Tooltip } from "react-tooltip"
import { ROUTES } from "../../../app/router/config";
import type { FC } from "react";

type Props = {
  cardId: string;
}
export const EditButton:FC<Props> = ({cardId}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${ROUTES.Cards}/${cardId}/edit`, {
      state: {cardId: cardId}
    });
  }
  return (
    <div onClick={handleClick} className="text-[--primary-color] cursor-pointer">
      <EditIcon
        size={27} 
        data-tooltip-id="edit"
        data-tooltip-content={"Edit quiz"}
      />
      <Tooltip id="edit"/>
    </div>
  )
}