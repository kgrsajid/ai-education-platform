import type { FC } from 'react';
import type { TQuizDetails } from '../../api/quiz/type';
import { useTranslation } from 'react-i18next';

type Props = {
  quiz: TQuizDetails;
};

export const QuizDetailMetrics: FC<Props> = ({ quiz }) => {
  const { t } = useTranslation();
  const estimatedTime = Math.ceil(quiz.questions.length * 1.5);

  const difficultyLabel: Record<string, string> = {
    easy: t('quiz.words.diff.easy'),
    medium: t('quiz.words.diff.medium'),
    hard: t('quiz.words.diff.hard'),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <div className="flex flex-col gap-1 p-5 rounded-xl border border-slate-800 bg-slate-900/50">
        <span className="text-slate-400 text-sm font-medium">{t('quizDetail.difficultyLevel')}</span>
        <p className="text-2xl font-bold text-white flex items-center gap-2">
          {difficultyLabel[quiz.difficulty] ?? quiz.difficulty}
          <span className="material-symbols-outlined text-amber-500 text-xl">bolt</span>
        </p>
      </div>

      <div className="flex flex-col gap-1 p-5 rounded-xl border border-slate-800 bg-slate-900/50">
        <span className="text-slate-400 text-sm font-medium">{t('quizDetail.totalQuestions')}</span>
        <p className="text-2xl font-bold text-white">
          {quiz.questions.length} MCQs
        </p>
      </div>

      <div className="flex flex-col gap-1 p-5 rounded-xl border border-slate-800 bg-slate-900/50">
        <span className="text-slate-400 text-sm font-medium">{t('quizDetail.allocatedTime')}</span>
        <p className="text-2xl font-bold text-white">~{estimatedTime} {t('quizInfo.min')}</p>
      </div>
    </div>
  );
};
