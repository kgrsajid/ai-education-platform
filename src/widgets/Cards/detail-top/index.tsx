import { Layers, Loader, Tag } from "lucide-react"
import type { FC } from "react"
import { motion } from "framer-motion";
import { useAuth } from "../../../providers/context/const/const";
import type { TCardDetail } from "../../../features/api/card/type";
import { EditButton } from "../../../features/card/edit/edit-button";

type Props = {
  card: TCardDetail,
  isLoading: boolean
}
export const CardInfoTop:FC<Props> = ({card, isLoading}) => {
  const {checkById} = useAuth();

  if(isLoading) {
    return <Loader/>;
  }
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 mb-14"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            {card.title}
          </h1>
          {
            checkById(card.authorId) && (
              <EditButton cardId={card.id}/>
            )
          }
        </div>

        <p className="text-gray-600 text-lg mb-6 max-w-3xl">
          {card.description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(card.categories ?? []).map((cat) => (
            <span
              key={cat.id}
              className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center gap-1"
            >
              <Layers size={14} />
              {cat.name}
            </span>
          ))}
          <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm">
            {card.cards.length} questions
          </span>
        </div>

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-500 flex items-center gap-1"
              >
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
  )
}