import { EditOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../app/router/config";
import type { FC } from "react";

type Props = {
  cardId: string;
};

export const EditButton: FC<Props> = ({ cardId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${ROUTES.Cards}/${cardId}/edit`, {
      state: { cardId: cardId },
    });
  };

  return (
    <Tooltip title="Edit card set" placement="left">
      <button
        onClick={handleClick}
        className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400
                   hover:text-[#1152d4] hover:border-[#1152d4]/50 transition-all"
      >
        <EditOutlined style={{ fontSize: "1.1rem" }} />
      </button>
    </Tooltip>
  );
};
