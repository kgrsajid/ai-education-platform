import { Loader } from "lucide-react";
import type { FC } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../providers/context/const/const";
import type { TCardDetail } from "../../../features/api/card/type";
import { EditButton } from "../../../features/card/edit/edit-button";
import { Tag, Tooltip } from "antd";

type Props = {
  card: TCardDetail;
  isLoading: boolean;
};

export const CardInfoTop: FC<Props> = ({ card, isLoading }) => {
  const { checkById } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader className="animate-spin text-[#1152d4]" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 mb-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg">
            <span className="material-symbols-outlined">style</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-0.5">
              Flashcard Set
            </p>
            <h1 className="text-2xl font-bold text-slate-100">{card.title}</h1>
          </div>
        </div>
        {checkById(card.authorId) && <EditButton cardId={card.id} />}
      </div>

      {card.description && (
        <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-2xl">
          {card.description}
        </p>
      )}

      {/* Stats row */}
      <div className="flex flex-wrap gap-3 mb-5">
        <Tooltip title="Total cards">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <span className="material-symbols-outlined text-blue-400" style={{ fontSize: "0.9rem" }}>
              quiz
            </span>
            <span className="text-blue-300 text-xs font-semibold">
              {card.cards.length} cards
            </span>
          </div>
        </Tooltip>
      </div>

      {/* Categories */}
      {(card.categories ?? []).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {card.categories.map((cat) => (
            <span
              key={cat.id}
              className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-medium rounded border border-slate-700"
            >
              {cat.name}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <Tag key={tag} color="blue" className="text-xs">
              #{tag}
            </Tag>
          ))}
        </div>
      )}
    </motion.div>
  );
};
