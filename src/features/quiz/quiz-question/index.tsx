import { motion } from 'framer-motion';
import type { FC } from 'react';
import type { TQuestion } from '../../api/quiz/type';

type Props = {
  quizTitle: string;
  question: TQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedOption: string | null;
  onSelect: (optionText: string) => void;
  onNext: () => void;
};

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const QuizQuestion: FC<Props> = ({
  quizTitle,
  question,
  questionIndex,
  totalQuestions,
  selectedOption,
  onSelect,
  onNext,
}) => {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;
  const isLast = questionIndex + 1 === totalQuestions;

  return (
    <div className=" bg-bg-dark flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-4 border-b border-slate-800 bg-[#111722] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">quiz</span>
          <h2 className="text-white font-semibold text-sm truncate max-w-xs">
            {quizTitle}
          </h2>
        </div>
        <span className="text-slate-400 text-sm font-medium tabular-nums">
          {questionIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-slate-800 mb-[200px]">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-2xl"
        >
          {/* Question label + text */}
          <div className="mb-8">
            <div className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
              Question {String(questionIndex + 1).padStart(2, '0')}
            </div>
            <h3 className="text-white text-2xl font-bold leading-snug">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === option.optionText;
              const letter = LETTERS[idx] ?? String(idx + 1);

              return (
                <motion.button
                  key={option.id}
                  onClick={() => onSelect(option.optionText)}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-4 text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-primary bg-primary/15 text-white'
                      : 'border-slate-700 bg-[#1a2233] text-slate-300 hover:border-primary/50 hover:bg-slate-800/60'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-sm font-medium leading-snug">
                    {option.optionText}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Next / Finish button */}
          <div className="flex justify-end">
            <button
              onClick={onNext}
              disabled={!selectedOption}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                selectedOption
                  ? 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/20'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              {isLast ? 'Finish Test' : 'Next Question'}
              <span className="material-symbols-outlined text-base">
                {isLast ? 'check_circle' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
