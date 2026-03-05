import type { FC } from 'react';
import type { TQuizResultResponse } from '../../api/quiz/type';

type Props = {
  results: TQuizResultResponse[];
  bestScore: number;
};

export const QuizDetailSideStats: FC<Props> = ({ results, bestScore }) => {
  const lastAttempt = results[results.length - 1];

  return (
    <div className="flex flex-col gap-4">
      {/* Best Score gradient card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-blue-700 text-white shadow-lg shadow-primary/20">
        <p className="text-white/80 text-sm font-medium mb-1">Your Best Score</p>
        <h4 className="text-4xl font-black mb-4">{bestScore}%</h4>
        <div className="flex items-center gap-2 text-xs font-medium py-1 px-3 bg-white/20 rounded-full w-fit">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          Top performer
        </div>
      </div>

      {/* Total attempts */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
        <p className="text-slate-400 text-sm font-medium mb-1">Total Attempts</p>
        <h4 className="text-2xl font-bold text-white mb-2">{results.length}</h4>
        <p className="text-xs text-emerald-500 font-medium">Keep practicing!</p>
      </div>

      {/* Last attempt score */}
      {lastAttempt && (
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
          <p className="text-slate-400 text-sm font-medium mb-1">Last Attempt</p>
          <h4 className="text-2xl font-bold text-white mb-3">
            {lastAttempt.percentage}%
          </h4>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${lastAttempt.percentage}%`,
                backgroundColor:
                  lastAttempt.percentage >= 80
                    ? '#22c55e'
                    : lastAttempt.percentage >= 50
                    ? '#f59e0b'
                    : '#ef4444',
              }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Score on last attempt</p>
        </div>
      )}
    </div>
  );
};
