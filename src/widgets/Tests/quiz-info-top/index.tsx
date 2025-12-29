import { Clock, Layers, PlayCircle, Tag } from "lucide-react"
import type { TQuizDetails } from "../../../features/api/quiz/type"
import type { FC } from "react"
import { difficultyColors } from "../const"
import { motion } from "framer-motion";

type Props = {
  quiz: TQuizDetails,
  handleStart: () => void;
}
export const QuizInfoTop:FC<Props> = ({quiz, handleStart}) => {
  const estimatedTime = Math.ceil(quiz.questions.length * 1.5);
  
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 mb-14"
      >
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          {quiz.title}
        </h1>

        <p className="text-gray-600 text-lg mb-6 max-w-3xl">
          {quiz.description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
              difficultyColors[quiz.difficulty]
            }`}
          >
            {quiz.difficulty.toUpperCase()}
          </span>

          {quiz.categories.map((cat) => (
            <span
              key={cat.id}
              className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center gap-1"
            >
              <Layers size={14} />
              {cat.name}
            </span>
          ))}

          <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm">
            {quiz.questions.length} questions
          </span>

          <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm flex items-center gap-1">
            <Clock size={14} />~{estimatedTime} min
          </span>
        </div>

        {/* Tags */}
        {quiz.tags && quiz.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {quiz.tags.map((tag) => (
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

        {/* CTA */}
        <button
          onClick={handleStart}
          className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition shadow-md"
        >
          <PlayCircle size={22} />
          Start Quiz
        </button>
      </motion.div>
  )
}