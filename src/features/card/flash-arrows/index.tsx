import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import type { FC } from "react";
import type { TCardResponse } from "../../api/card/type";

type Props = {
  index: number;
  cardsOrder: TCardResponse[];
  isProgress?: boolean;
  handleAddToLearning: () => void;
  handleAddToKnows: () => void;
  handleRight: () => void;
  handleUndo: () => void;
};
export const FlashArrows: FC<Props> = ({
  index,
  cardsOrder,
  isProgress = false,
  handleAddToLearning,
  handleAddToKnows,
  handleRight,
  handleUndo,
}) => {
  return (
    <div className="flex items-center justify-center gap-8">
      {isProgress ? (
        <button
          onClick={handleAddToLearning}
          className="w-11 h-11 rounded-full border
                      flex items-center justify-center
                      text-gray-500
                      transition-all duration-200
                      hover:scale-110 active:scale-95
                      disabled:opacity-40"
        >
          <X color="red" size={18} />
        </button>
      ) : (
        <button
          onClick={handleUndo}
          disabled={index === 0}
          className="w-11 h-11 rounded-full border
                      flex items-center justify-center
                      text-gray-500
                      transition-all duration-200
                      hover:scale-110 active:scale-95
                      disabled:opacity-40"
        >
          <ArrowLeft size={18} />
        </button>
      )}

      <span className="text-sm font-medium text-gray-500">
        {index + 1} / {cardsOrder.length}
      </span>
      {isProgress ? (
        <button
          onClick={handleAddToKnows}
          className="w-11 h-11 rounded-full border
                      flex items-center justify-center
                      text-gray-500
                      transition-all duration-200
                      hover:scale-110 active:scale-95
                      disabled:opacity-40"
        >
          <Check color="green" size={18} />
        </button>
      ) : (
        <button
          onClick={handleRight}
          disabled={index === cardsOrder.length}
          className="w-11 h-11 rounded-full border
                      flex items-center justify-center
                      text-gray-500
                      transition-all duration-200
                      hover:scale-110 active:scale-95
                      disabled:opacity-40"
        >
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
};
