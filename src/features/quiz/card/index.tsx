import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { DifficultyEnumType, TQuiz } from "../../api/quiz/type";

type Props = {
  quiz: TQuiz;
};

const DIFFICULTY_LABEL: Record<DifficultyEnumType, string> = {
  easy: "Beginner",
  medium: "Intermediate",
  hard: "Advanced",
};

const CARD_COLORS = [
  { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-600 dark:text-blue-400", icon: "calculate" },
  { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-600 dark:text-purple-400", icon: "code" },
  { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-600 dark:text-emerald-400", icon: "biotech" },
  { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-600 dark:text-amber-400", icon: "history_edu" },
  { bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-600 dark:text-rose-400", icon: "menu_book" },
  { bg: "bg-indigo-100 dark:bg-indigo-900/40", text: "text-indigo-600 dark:text-indigo-400", icon: "database" },
];

function getCardColor(id: string | number) {
  const str = String(id);
  const sum = str.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return CARD_COLORS[sum % CARD_COLORS.length];
}

export const QuizCard: FC<Props> = ({ quiz }) => {
  const navigate = useNavigate();
  const color = getCardColor(quiz.id);

  const handleNavigate = () => navigate(`/quiz/${quiz.id}`);

  return (
    <div
      onClick={handleNavigate}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-[#1152d4]/50 transition-all duration-200 group cursor-pointer flex flex-col justify-between hover:shadow-lg hover:shadow-[#1152d4]/5"
    >
      <div>
        {/* Icon + difficulty badge */}
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 ${color.bg} ${color.text} rounded-lg`}>
            <span className="material-symbols-outlined">{color.icon}</span>
          </div>
          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded uppercase tracking-wide">
            {DIFFICULTY_LABEL[quiz.difficulty]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-[#1152d4] transition-colors">
          {quiz.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {quiz.description}
        </p>

        {/* Categories + first 2 tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {quiz.categories.map((cat) => (
            <span
              key={cat.id}
              className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded font-medium"
            >
              {cat.name}
            </span>
          ))}
          {quiz.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 text-xs rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Take Test button */}
      <button
        onClick={(e) => { e.stopPropagation(); handleNavigate(); }}
        className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 group-hover:bg-[#1152d4] group-hover:text-white text-slate-700 dark:text-slate-300 font-bold rounded-lg transition-all text-sm flex items-center justify-center gap-1.5"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>play_arrow</span>
        Take Test
        <span className="opacity-50 font-normal text-xs ml-1">· {quiz.numberOfQuestion}Q</span>
      </button>
    </div>
  );
};
