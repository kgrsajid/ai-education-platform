import { Tooltip } from "antd";
import { Pause, Play, Shuffle, Undo } from "lucide-react";
import type { Dispatch, FC, SetStateAction } from "react";

type Props = {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  isShuffled: boolean;
  handleShuffleToggle: () => void;
  isProgressActive?: boolean;
  handleUndo: () => void;
  index: number;
};

export const FlashModes: FC<Props> = ({
  isPlaying,
  setIsPlaying,
  isShuffled,
  handleShuffleToggle,
  isProgressActive = false,
  handleUndo,
  index,
}) => {
  return (
    <div className="flex justify-end gap-2">
      {!isProgressActive ? (
        <Tooltip placement="bottom" title={isPlaying ? "Pause" : "Autoplay"}>
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className={`w-11 h-11 rounded-full flex items-center justify-center
              transition-all duration-200 hover:scale-110 active:scale-95
              border ${
                isPlaying
                  ? "bg-[#1152d4] border-[#1152d4] text-white"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
              }`}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </Tooltip>
      ) : (
        <Tooltip placement="bottom" title={index !== 0 ? "Undo" : ""}>
          <button
            onClick={handleUndo}
            disabled={index === 0}
            className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700
                       flex items-center justify-center text-slate-400
                       transition-all duration-200 hover:scale-110 active:scale-95
                       hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Undo size={18} />
          </button>
        </Tooltip>
      )}

      <Tooltip placement="bottom" title="Shuffle">
        <button
          onClick={handleShuffleToggle}
          className={`w-11 h-11 rounded-full flex items-center justify-center
            transition-all duration-200 hover:scale-110 active:scale-95
            border ${
              isShuffled
                ? "bg-[#1152d4] border-[#1152d4] text-white"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
            }`}
        >
          <Shuffle size={18} />
        </button>
      </Tooltip>
    </div>
  );
};
