import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Hash } from "lucide-react";
import type { TCard } from "../../api/card/type";
import { ROUTES } from "../../../app/router/config";

type Props = {
  card: TCard;
};


const DESCRIPTION_LIMIT = 120;
const MAX_TAGS = 5;

export const CardItem: FC<Props> = ({ card }) => {
  const navigate = useNavigate();

  const shortDescription =
    card.description.length > DESCRIPTION_LIMIT
      ? card.description.slice(0, DESCRIPTION_LIMIT) + "…"
      : card.description;

  const visibleTags = card.tags?.slice(0, MAX_TAGS) ?? [];
  const hiddenTagsCount = (card.tags?.length ?? 0) - visibleTags.length;
  return (
    <div
      onClick={() => navigate(`${ROUTES.Cards}/${card.id}`)}
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
          {card.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {shortDescription}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(card.categories ?? []).map((category) => (
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
        <div className="flex gap-2">
          <span
            className="
              inline-flex items-center gap-1
              text-xs font-medium
              text-blue-600 bg-blue-50
              px-3 py-1 rounded-full
            "
          >
            <BookOpen size={14} />
            {card.numberOfQuestions} questions
          </span>
        </div>
      </div>
    </div>
  );
};
