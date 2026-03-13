import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

type Card = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  knows: Card[];
  stillLearning: Card[];
  onRestart: () => void;
  onLearnUnknown: () => void;
  onBack: () => void;
};

export function FlashcardsSummary({
  knows,
  stillLearning,
  onRestart,
  onLearnUnknown,
  onBack,
}: Props) {
  const { t } = useTranslation();
  const total = knows.length + stillLearning.length;
  const percentage = total === 0 ? 0 : Math.round((knows.length / total) * 100);
  const successRate = total === 0 ? 0 : knows.length / total;

  const RADIUS = 52;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const strokeOffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  const getStrokeColor = () => {
    if (percentage === 100) return "#10b981";
    if (percentage >= 75) return "#1152d4";
    if (percentage >= 50) return "#f59e0b";
    return "#f43f5e";
  };

  const getMessage = () => {
    if (successRate === 1) return t('card.phrases.flashcard.perfectScore');
    if (successRate >= 0.75) return t('card.phrases.flashcard.greatJob');
    if (successRate >= 0.5) return t('card.phrases.flashcard.goodProgress');
    return t('card.phrases.flashcard.niceStart');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-900/50 border border-slate-800 rounded-xl p-8"
    >
      <h2 className="text-2xl font-bold text-slate-100 mb-6">{getMessage()}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left — ring + stats */}
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            {/* SVG Ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260 }}
              className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center"
            >
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r={RADIUS}
                  stroke="rgb(30 41 59)"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r={RADIUS}
                  stroke={getStrokeColor()}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  initial={{ strokeDashoffset: CIRCUMFERENCE }}
                  animate={{ strokeDashoffset: strokeOffset }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>
              <span className="text-slate-100 text-2xl font-bold z-10">
                {percentage === 100 ? <Check size={36} className="text-emerald-400" /> : `${percentage}%`}
              </span>
            </motion.div>

            {/* Know / Still learning */}
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-center px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-emerald-400 text-sm font-medium">{t('card.phrases.flashcard.mastered')}</span>
                <span className="text-emerald-300 font-bold">{knows.length}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700">
                <span className="text-slate-400 text-sm font-medium">{t('card.phrases.flashcard.stillLearning')}</span>
                <span className="text-slate-300 font-bold">{stillLearning.length}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onBack}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>arrow_back</span>
            {t('card.phrases.flashcard.backToLastCard')}
          </button>
        </div>

        {/* Right — actions */}
        <div className="flex flex-col gap-3 justify-center">
          {stillLearning.length > 0 && (
            <Button
              type="primary"
              size="large"
              block
              onClick={onLearnUnknown}
              style={{ background: "#1152d4", borderColor: "#1152d4" }}
              className="font-semibold"
            >
              {t('card.phrases.flashcard.studyRemaining', { n: stillLearning.length })}
            </Button>
          )}
          <Button
            size="large"
            block
            onClick={onRestart}
            className="font-semibold border-slate-700 text-slate-300 hover:text-slate-100"
            style={{ background: "transparent", borderColor: "rgb(51 65 85)" }}
          >
            {t('card.phrases.flashcard.restartAllCards')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
