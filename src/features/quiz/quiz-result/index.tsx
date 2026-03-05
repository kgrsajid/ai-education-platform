import { motion } from 'framer-motion';
import type { FC } from 'react';

export type AnswerResult = {
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
};

type Props = {
  quizTitle: string;
  answers: AnswerResult[];
  score: number;
  totalQuestions: number;
  percentage: number;
  onBack: () => void;
};

const getStatus = (pct: number) => {
  if (pct >= 80)
    return { label: 'Excellent!', color: '#22c55e', textClass: 'text-emerald-400' };
  if (pct >= 50)
    return { label: 'Good Job!', color: '#f59e0b', textClass: 'text-amber-400' };
  return { label: 'Keep Practicing', color: '#ef4444', textClass: 'text-red-400' };
};

export const QuizResult: FC<Props> = ({
  quizTitle,
  answers,
  score,
  totalQuestions,
  percentage,
  onBack,
}) => {
  const status = getStatus(percentage);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (percentage / 100) * circumference;
  const wrong = totalQuestions - score;

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Top bar */}
      <div className="px-6 py-4 border-b border-slate-800 bg-[#111722] flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-xl">quiz</span>
        <h2 className="text-white font-semibold text-sm">{quizTitle}</h2>
        <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-400">
          Completed
        </span>
      </div>

      <div className="max-w-2xl mx-auto p-6 pb-16">
        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a2233] border border-slate-800 rounded-2xl p-8 mb-8"
        >
          <div className="text-center mb-6">
            <p className={`text-xl font-black ${status.textClass}`}>{status.label}</p>
            <p className="text-slate-400 text-sm mt-1">You've completed the test</p>
          </div>

          <div className="flex items-center justify-center gap-10">
            {/* Ring */}
            <div className="relative shrink-0">
              <svg width="128" height="128" viewBox="0 0 128 128">
                <circle
                  cx="64" cy="64" r="52"
                  fill="none" stroke="#1e293b" strokeWidth="10"
                />
                <motion.circle
                  cx="64" cy="64" r="52"
                  fill="none"
                  stroke={status.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  transform="rotate(-90 64 64)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-black text-white">{percentage}%</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Score</p>
                <p className="text-white text-2xl font-black">
                  {score}
                  <span className="text-slate-500 text-lg font-medium"> / {totalQuestions}</span>
                </p>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-slate-400 text-xs mb-1">Correct</p>
                  <p className="text-emerald-400 text-xl font-bold">{score}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Wrong</p>
                  <p className="text-red-400 text-xl font-bold">{wrong}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bar breakdown */}
          <div className="mt-6">
            <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
              {Array.from({ length: totalQuestions }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1"
                  style={{ backgroundColor: i < score ? status.color : '#1e293b' }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs" style={{ color: status.color }}>
                ✓ {score} correct
              </span>
              <span className="text-xs text-red-400">✗ {wrong} wrong</span>
            </div>
          </div>
        </motion.div>

        {/* Answer review */}
        <h3 className="text-white font-bold text-lg mb-4">Answer Review</h3>
        <div className="space-y-3 mb-8">
          {answers.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`p-4 rounded-xl border ${
                a.isCorrect
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-red-500/30 bg-red-500/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                    a.isCorrect
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {a.isCorrect ? '✓' : '✗'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm font-medium mb-1">
                    {i + 1}. {a.question}
                  </p>
                  <p className="text-slate-400 text-xs">
                    Your answer:{' '}
                    <span className={a.isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                      {a.selected}
                    </span>
                  </p>
                  {!a.isCorrect && (
                    <p className="text-xs text-emerald-400 mt-0.5">
                      Correct: {a.correct}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={onBack}
          className="w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
        >
          Back to Tests
        </button>
      </div>
    </div>
  );
};
