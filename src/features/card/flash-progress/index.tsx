import type { FC } from "react";
import type { TCardResponse } from "../../api/card/type";

type Props = {
  index: number;
  cardsOrder: TCardResponse[];
}
export const FlashProgress:FC<Props> = ({index, cardsOrder}) => {
  return(
    <div className="mt-3">
      <div className="w-full h-[3px] rounded-full bg-gray-300">
        <div style={{width: `${(index/(cardsOrder.length)) * 100}%`}} className="bg-[--primary-hover-color] h-full rounded-full transition-all duration-300"></div>
      </div>
    </div>
  );
}