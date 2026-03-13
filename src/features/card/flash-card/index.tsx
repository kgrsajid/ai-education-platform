import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  front: string;
  back: string;
};

export const FlashCard = ({ front, back }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsFlipped(false);
  }, [front, back]);

  return (
    <div className="w-full mx-auto flex flex-1 justify-center perspective">
      <motion.div
        className="relative w-full cursor-pointer"
        style={{ minHeight: "300px", transformStyle: "preserve-3d" }}
        onClick={() => setIsFlipped((v) => !v)}
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-slate-900 border border-slate-700 rounded-xl
                      flex flex-col items-center justify-center px-8 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateX(0deg)" }}
        >
          <span className="material-symbols-outlined text-slate-600 mb-3" style={{ fontSize: "2rem" }}>
            help_outline
          </span>
          <p className="text-slate-100 text-xl font-semibold leading-relaxed">{front}</p>
          <p className="text-slate-600 text-xs mt-4">{t('card.phrases.flashcard.clickToReveal')}</p>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-[#1152d4]/10 border border-[#1152d4]/30 rounded-xl
                      flex flex-col items-center justify-center px-8 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
        >
          <span className="material-symbols-outlined text-[#1152d4]/60 mb-3" style={{ fontSize: "2rem" }}>
            lightbulb
          </span>
          <p className="text-slate-100 text-xl font-semibold leading-relaxed">{back}</p>
          <p className="text-[#1152d4]/60 text-xs mt-4">{t('card.phrases.flashcard.clickToFlipBack')}</p>
        </div>
      </motion.div>
    </div>
  );
};
