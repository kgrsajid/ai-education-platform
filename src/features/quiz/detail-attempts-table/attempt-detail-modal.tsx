import { Modal } from 'antd';
import type { FC } from 'react';
import type { TQuizResultResponse } from '../../api/quiz/type';

type Props = {
  result: TQuizResultResponse | null;
  onClose: () => void;
};

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const getStatus = (percentage: number) => {
  if (percentage >= 80) return { label: 'Excellent', color: '#22c55e', bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' };
  if (percentage >= 50) return { label: 'Good', color: '#f59e0b', bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400' };
  return { label: 'Needs Improvement', color: '#ef4444', bg: 'bg-red-500/10 border-red-500/30 text-red-400' };
};

export const AttemptDetailModal: FC<Props> = ({ result, onClose }) => {
  if (!result) return null;

  const status = getStatus(result.percentage);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (result.percentage / 100) * circumference;

  return (
    <Modal
      open={!!result}
      onCancel={onClose}
      footer={null}
      centered
      width={480}
      styles={{
        content: { background: '#0f172a', border: '1px solid #1e293b', borderRadius: 16, padding: 0 },
        mask: { backdropFilter: 'blur(4px)' },
      }}
    >
      {/* Header */}

      <div className="p-6">
        {/* Top row: attempt badge + date */}
        <div className="mb-6 flex flex-col gap-4">
          <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
            Attempt #{result.attempt}
          </span>
          <div className="flex items-center justify-between gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${status.bg}`}>
              {status.label}
            </span>
            <span className="text-slate-400 text-xs">{formatDate(result.createdAt)}</span>
          </div>
        </div>

        {/* Circular progress + score */}
        <div className="flex items-center justify-center gap-10 mb-8">
          {/* SVG ring */}
          <div className="relative flex items-center justify-center">
            <svg width="128" height="128" viewBox="0 0 128 128">
              <circle
                cx="64" cy="64" r="52"
                fill="none"
                stroke="#1e293b"
                strokeWidth="10"
              />
              <circle
                cx="64" cy="64" r="52"
                fill="none"
                stroke={status.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 64 64)"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white">{result.percentage}%</span>
            </div>
          </div>

          {/* Score stats */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Score</span>
              <span className="text-white text-2xl font-black">
                {result.score}
                <span className="text-slate-500 text-lg font-medium"> / {result.maxScore}</span>
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Correct Answers</span>
              <span className="text-white text-xl font-bold">{result.score} / {result.maxScore}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Wrong Answers</span>
              <span className="text-red-400 text-xl font-bold">{result.maxScore - result.score}</span>
            </div>
          </div>
        </div>

        {/* Score bar breakdown */}
        <div className="bg-slate-800/60 rounded-xl p-4 mb-4">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Score breakdown</span>
            <span>{result.score} correct of {result.maxScore}</span>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            {Array.from({ length: result.maxScore }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{ backgroundColor: i < result.score ? status.color : '#1e293b' }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs" style={{ color: status.color }}>
              ✓ {result.score} correct
            </span>
            <span className="text-xs text-red-400">
              ✗ {result.maxScore - result.score} wrong
            </span>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors mt-2"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
