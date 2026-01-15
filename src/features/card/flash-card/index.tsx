import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Props = {
  front: string;
  back: string;
};

export const FlashCard = ({ front, back }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // сброс переворота при смене карточки
  useEffect(() => {
    setIsFlipped(false);
  }, [front, back]);

  return (
    <div className="w-full mx-auto flex justify-center perspective">
      <motion.div
        className="relative w-full aspect-[2/1] cursor-pointer"
        onClick={() => setIsFlipped(v => !v)}
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-xl
                        flex items-center justify-center text-xl font-semibold px-4
                        backface-hidden">
          {front}
        </div>

        {/* BACK */}
        <div className="absolute inset-0 bg-indigo-600 text-white rounded-2xl shadow-xl
                        flex items-center justify-center text-xl font-semibold px-4
                        backface-hidden rotate-x-180">
          {back}
        </div>
      </motion.div>
    </div>
  );
};
