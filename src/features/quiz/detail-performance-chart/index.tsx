import { useState, type FC } from 'react';
import type { TQuizResultResponse } from '../../api/quiz/type';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

type Props = {
  results: TQuizResultResponse[];
};

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const LIMIT_OPTIONS = [
  { label: 'Last 5 attempts', value: 5 },
  { label: 'Last 10 attempts', value: 10 },
];

export const PerformanceBarChart: FC<Props> = ({ results }) => {
  const [limit, setLimit] = useState(5);

  const sliced = results.slice(-limit);
  const maxScore = sliced.length > 0 ? Math.max(...sliced.map((r) => r.percentage)) : 0;

  const data = sliced.map((r) => ({
    date: formatDate(r.createdAt),
    score: r.percentage,
  }));

  return (
    <div className="flex flex-col gap-6 p-6 rounded-2xl border border-slate-800 bg-slate-900/50 h-full">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Performance History</h3>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="bg-transparent border-none text-sm text-slate-400 focus:ring-0 cursor-pointer outline-none"
        >
          {LIMIT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#1a2233]">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={36} barCategoryGap="30%">
          <XAxis
            dataKey="date"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={34}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            cursor={{ fill: 'rgba(17, 82, 212, 0.08)' }}
            contentStyle={{
              backgroundColor: '#1a2233',
              border: '1px solid #334155',
              borderRadius: 8,
              color: '#f1f5f9',
              fontSize: 12,
            }}
            formatter={(v: number) => [`${v}%`, 'Score']}
          />
          <Bar dataKey="score" radius={[6, 6, 0, 0]}>
            {data.map((entry, idx) => (
              <Cell
                key={idx}
                fill={entry.score === maxScore ? '#1152d4' : '#1e293b'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
