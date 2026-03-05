import type { FC } from 'react';
import type { TQuizDetails } from '../../api/quiz/type';

type Props = {
  quiz: TQuizDetails;
};

const difficultyLabel: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Advanced',
};

export const QuizDetailMetrics: FC<Props> = ({ quiz }) => {
  const estimatedTime = Math.ceil(quiz.questions.length * 1.5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <div className="flex flex-col gap-1 p-5 rounded-xl border border-slate-800 bg-slate-900/50">
        <span className="text-slate-400 text-sm font-medium">Difficulty Level</span>
        <p className="text-2xl font-bold text-white flex items-center gap-2">
          {difficultyLabel[quiz.difficulty] ?? quiz.difficulty}
          <span className="material-symbols-outlined text-amber-500 text-xl">bolt</span>
        </p>
      </div>

      <div className="flex flex-col gap-1 p-5 rounded-xl border border-slate-800 bg-slate-900/50">
        <span className="text-slate-400 text-sm font-medium">Total Questions</span>
        <p className="text-2xl font-bold text-white">
          {quiz.questions.length} MCQs
        </p>
      </div>

      <div className="flex flex-col gap-1 p-5 rounded-xl border border-slate-800 bg-slate-900/50">
        <span className="text-slate-400 text-sm font-medium">Allocated Time</span>
        <p className="text-2xl font-bold text-white">~{estimatedTime} Min</p>
      </div>
    </div>
  );
};
