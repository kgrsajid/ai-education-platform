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
    <div className="flex items-center justify-center gap-6">
      {isProgress ? (
        <button
          onClick={handleAddToLearning}
          className="w-11 h-11 rounded-full bg-rose-500/10 border border-rose-500/30
                     flex items-center justify-center text-rose-400
                     transition-all duration-200 hover:scale-110 active:scale-95
                     hover:bg-rose-500/20"
        >
          <X size={18} />
        </button>
      ) : (
        <button
          onClick={handleUndo}
          disabled={index === 0}
          className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700
                     flex items-center justify-center text-slate-400
                     transition-all duration-200 hover:scale-110 active:scale-95
                     hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={18} />
        </button>
      )}

      <span className="text-sm font-semibold text-slate-400 min-w-[48px] text-center">
        {index + 1} / {cardsOrder.length}
      </span>

      {isProgress ? (
        <button
          onClick={handleAddToKnows}
          className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/30
                     flex items-center justify-center text-emerald-400
                     transition-all duration-200 hover:scale-110 active:scale-95
                     hover:bg-emerald-500/20"
        >
          <Check size={18} />
        </button>
      ) : (
        <button
          onClick={handleRight}
          disabled={index === cardsOrder.length}
          className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700
                     flex items-center justify-center text-slate-400
                     transition-all duration-200 hover:scale-110 active:scale-95
                     hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
};
