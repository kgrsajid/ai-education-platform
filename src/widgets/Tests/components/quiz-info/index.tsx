import { useParams, useNavigate } from "react-router-dom";
import { quizzes } from "../../data";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

const QuizInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q.id === Number(id));

  if (!quiz)
    return (
      <div className="flex h-screen justify-center items-center text-lg text-gray-600">
        Quiz not found 😢
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full bg-white/80 backdrop-blur shadow-xl rounded-3xl p-8 border border-gray-100 text-center"
      >
        {/* Заголовок */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          {quiz.title}
        </h1>

        {/* Категория и количество */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            {quiz.category}
          </span>
          <span className="text-sm text-gray-500">
            {quiz.questions.length} questions
          </span>
        </div>

        {/* Описание */}
        <p className="text-gray-700 leading-relaxed mb-8">
          {quiz.description}
        </p>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/quiz/${quiz.id}/start`)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition"
          >
            <PlayCircle size={20} />
            Start Quiz
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
          >
            <ArrowLeft size={18} />
            Back
          </motion.button>
        </div>
      </motion.div>

      {/* Дополнительные визуальные детали */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="absolute top-20 right-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="absolute bottom-20 left-16 w-64 h-64 bg-indigo-300 rounded-full blur-3xl"
      ></motion.div>
    </div>
  );
};

export default QuizInfoPage;
