import { useState, type FC } from 'react';
import type { TQuizResultResponse } from '../../api/quiz/type';
import { AttemptDetailModal } from './attempt-detail-modal';

type Props = {
  results: TQuizResultResponse[];
};

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return 'text-emerald-400';
  if (percentage >= 50) return 'text-amber-400';
  return 'text-red-400';
};

export const QuizAttemptsTable: FC<Props> = ({ results }) => {
  const [selected, setSelected] = useState<TQuizResultResponse | null>(null);

  if (results.length === 0) return null;

  const recent = [...results].reverse().slice(0, 5);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-white mb-6">Recent Attempts</h3>
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-sm border-b border-slate-800">
              <th className="py-4 px-6 font-medium">Date</th>
              <th className="py-4 px-6 font-medium">Score</th>
              <th className="py-4 px-6 font-medium">Attempt</th>
              <th className="py-4 px-6 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {recent.map((r, idx) => (
              <tr
                key={r.id}
                className={`hover:bg-slate-800/30 transition-colors ${
                  idx < recent.length - 1 ? 'border-b border-slate-800/50' : ''
                }`}
              >
                <td className="py-4 px-6 text-slate-300">{formatDate(r.createdAt)}</td>
                <td className={`py-4 px-6 font-bold ${getScoreColor(r.percentage)}`}>
                  {r.percentage}%
                </td>
                <td className="py-4 px-6 text-slate-400">#{r.attempt}</td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => setSelected(r)}
                    className="text-primary font-bold hover:underline text-sm"
                  >
                    Review Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AttemptDetailModal result={selected} onClose={() => setSelected(null)} />
    </div>
  );
};
