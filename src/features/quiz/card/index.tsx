import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Hash } from "lucide-react";
import type { DifficultyEnumType, TQuiz } from "../../api/quiz/type";

type Props = {
  quiz: TQuiz;
};

const DIFFICULTY_STYLES: Record<
  DifficultyEnumType,
  { label: string; className: string }
> = {
  easy: {
    label: "Easy",
    className: "bg-green-100 text-green-700",
  },
  medium: {
    label: "Medium",
    className: "bg-yellow-100 text-yellow-700",
  },
  hard: {
    label: "Hard",
    className: "bg-red-100 text-red-700",
  },
};

const DESCRIPTION_LIMIT = 120;
const MAX_TAGS = 5;

export const QuizCard: FC<Props> = ({ quiz }) => {
  const navigate = useNavigate();

  const shortDescription =
    quiz.description.length > DESCRIPTION_LIMIT
      ? quiz.description.slice(0, DESCRIPTION_LIMIT) + "…"
      : quiz.description;

  const visibleTags = quiz.tags?.slice(0, MAX_TAGS) ?? [];
  const hiddenTagsCount = (quiz.tags?.length ?? 0) - visibleTags.length;
  const difficulty = DIFFICULTY_STYLES[quiz.difficulty];
  return (
    <div
      onClick={() => navigate(`/quiz/${quiz.id}`)}
      className="
        group relative cursor-pointer rounded-3xl
        bg-white/70 backdrop-blur-xl
        border border-white/40
        shadow-[0_20px_40px_rgba(0,0,0,0.08)]
        hover:shadow-[0_30px_60px_rgba(59,130,246,0.25)]
        transition-all duration-300
        hover:-translate-y-2
        p-6 flex flex-col justify-between
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition mb-2 line-clamp-2">
          {quiz.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {shortDescription}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quiz.categories.map((category) => (
            <span
              key={category.id}
              className="
                text-xs font-medium
                bg-gradient-to-r from-indigo-500 to-blue-500
                text-white px-3 py-1 rounded-full
                shadow-sm
              "
            >
              {category.name}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="
                flex items-center gap-1
                text-xs text-gray-600
                bg-gray-100 hover:bg-gray-200
                px-2 py-1 rounded-full transition
              "
            >
              <Hash size={12} />
              {tag}
            </span>
          ))}

          {hiddenTagsCount > 0 && (
            <span className="text-xs text-gray-400">
              +{hiddenTagsCount} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <span
          className="
            inline-flex items-center gap-1
            text-xs font-medium
            text-blue-600 bg-blue-50
            px-3 py-1 rounded-full
          "
        >
          <BookOpen size={14} />
          {quiz.numberOfQuestion} questions
        </span>

        <span
          className={`
            text-xs font-semibold uppercase tracking-wide
            px-3 py-1 rounded-full
            ${difficulty.className}
          `}
        >
          {difficulty.label}
        </span>

      </div>
    </div>
  );
};
