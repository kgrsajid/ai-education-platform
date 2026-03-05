import { motion } from 'framer-motion';
import type { FC } from 'react';
import type { TQuizDetails } from '../../api/quiz/type';
import { useAuth } from '../../../providers/context/const/const';
import { EditButton } from '../edit/edit-button';

type Props = {
  quiz: TQuizDetails;
  onStart: () => void;
};

export const QuizDetailHeader: FC<Props> = ({ quiz, onStart }) => {
  const { checkById } = useAuth();

  return (
    <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 max-w-2xl"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
            {quiz.title}
          </h2>
          {checkById(quiz.authorId) && <EditButton quizId={quiz.id} />}
        </div>

        <p className="text-slate-400 text-lg leading-relaxed">
          {quiz.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {quiz.categories.map((cat) => (
            <span
              key={cat.id}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20"
            >
              {cat.name}
            </span>
          ))}
          {quiz.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -2 }}
        onClick={onStart}
        className="flex items-center gap-2 px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-primary/20 transition-colors shrink-0"
      >
        <span className="material-symbols-outlined">play_arrow</span>
        Start Test
      </motion.button>
    </div>
  );
};
