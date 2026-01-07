import { EditIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Tooltip } from "react-tooltip"
import { ROUTES } from "../../../app/router/config";
import type { FC } from "react";

type Props = {
  quizId: string;
}
export const EditButton:FC<Props> = ({quizId}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${ROUTES.Quiz}/${quizId}/edit`, {
      state: {quizId: quizId}
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