import { motion } from "framer-motion";
import { Check } from "lucide-react";

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
  const total = knows.length + stillLearning.length;
  const successRate = total === 0 ? 0 : knows.length / total;
  const percentage = total === 0 ? 0 : Math.round((knows.length / total) * 100);
  const RADIUS = 52;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const strokeOffset =
    CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
  const progressStyles = () => {
    if (percentage === 100) {
      return {
        stroke: "#10b981", // emerald-500
        bg: "#d1fae5",
        text: "text-emerald-600",
      };
    }

    if (percentage >= 75) {
      return {
        stroke: "#6366f1", // indigo-500
        bg: "#e0e7ff",
        text: "text-indigo-600",
      };
    }

    if (percentage >= 50) {
      return {
        stroke: "#f59e0b", // amber-500
        bg: "#fef3c7",
        text: "text-amber-600",
      };
    }

    return {
      stroke: "#f43f5e", // rose-500
      bg: "#ffe4e6",
      text: "text-rose-600",
    };
  };

  const styles = progressStyles();

  const getMessage = () => {
    if (successRate === 1)
      return "🎉 Поздравляю! Ты справился на ура!";
    if (successRate >= 0.75)
      return "🔥 Отличный результат, совсем немного осталось!";
    if (successRate >= 0.5)
      return "👍 Хорошая работа, продолжаем!";
    return "🚀 Неплохое начало, попробуй ещё раз!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full mx-auto text-gray-900 bg-white p-10 shadow-md rounded-3xl"
    >
      <h2 className="text-3xl font-semibold mb-8">
        {getMessage()}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Левая колонка */}
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260 }}
              className="relative w-28 h-28 flex items-center justify-center"
            >
              {/* Background circle */}
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r={RADIUS}
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />

                {/* Progress circle */}
                <motion.circle
                  cx="56"
                  cy="56"
                  r={RADIUS}
                  stroke={styles.stroke}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  initial={{ strokeDashoffset: CIRCUMFERENCE }}
                  animate={{ strokeDashoffset: strokeOffset }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>

              {/* Center content */}
              <div
                className={`w-28 h-28 rounded-full flex items-center justify-center ${styles.text}`}
              >
                <span className="text-[26px] font-bold">
                  {percentage === 100 ? <Check size={40}/> : `${percentage}%`}
                </span>
              </div>
            </motion.div>

            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-center px-4 py-2 rounded-full bg-emerald-50 text-emerald-700">
                <span className="text-sm font-medium">Изучено</span>
                <span className="font-semibold">{knows.length}</span>
              </div>

              <div className="flex justify-between items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700">
                <span className="text-sm font-medium">Осталось</span>
                <span className="font-semibold">{stillLearning.length}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            ← Вернуться к последнему вопросу
          </button>
        </div>

        {/* Правая колонка */}
        <div className="flex flex-col gap-4 justify-center">
          {stillLearning.length > 0 && (
            <button
              onClick={onLearnUnknown}
              className="w-full py-3 rounded-xl bg-[--primary-color] text-white font-medium hover:bg-[primary-hover-color] transition"
            >
              Изучить незнающие вопросы
            </button>
          )}

          <button
            onClick={onRestart}
            className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Restart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
