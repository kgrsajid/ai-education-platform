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
}
export const FlashModes:FC<Props> = ({isPlaying, setIsPlaying, isShuffled, handleShuffleToggle, isProgressActive = false, handleUndo, index}) => {
  return(
    <div className="flex justify-end gap-3">
      {/* PLAY */}
      {
        !isProgressActive ? 
          <Tooltip placement="bottom" title={isPlaying ? "Play" : "Pause"}>
            <button
              onClick={() => setIsPlaying(p => !p)}
              className={`w-11 h-11 rounded-full
                flex items-center justify-center
                transition-all duration-200
                hover:scale-110 active:scale-95
                ${
                  isPlaying
                    ? "bg-[--primary-color] text-white"
                    : "hover:bg-gray-300"
                }`}
            >
              {
                isPlaying ? 
                  <Pause size={18}/>
                  :
                  <Play size={18} />
              }
            </button>
          </Tooltip> :
          <Tooltip placement="bottom" title={index != 0 ? "Undo" : ""}>
            <button
              onClick={handleUndo}
              disabled={index == 0}
              className={`w-11 h-11 rounded-full
                flex items-center justify-center
                transition-all duration-200
                hover:scale-110 active:scale-95
                hover:bg-gray-300
                }`}
            >
              <Undo/>
            </button>
          </Tooltip>
      }

      {/* SHUFFLE */}
      <Tooltip placement="bottom" title="Shuffle">
        <button
          onClick={handleShuffleToggle}
          className={`w-11 h-11 rounded-full
            flex items-center justify-center
            transition-all duration-200
            hover:scale-110 active:scale-95
            
            ${
              isShuffled
                ? "bg-[--primary-color] text-white"
                : "hover:bg-gray-300"
            }`}
        >
          <Shuffle size={18} />
        </button>
      </Tooltip>
    </div>
  );
}