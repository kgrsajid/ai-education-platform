import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { quizzes } from "../../data";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q.id === Number(id));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  if (!quiz)
    return (
      <div className="flex h-screen justify-center items-center text-lg text-gray-600">
        Quiz not found 😢
      </div>
    );

  const questionsData = quiz.questions;
  const currentQuestion = questionsData[currentIndex];
  const isMultiple = currentQuestion.type === "multiple";

  const handleSelect = (option: string) => {
    if (isMultiple) {
      // multiple choice — toggle selection
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    } else {
      // single choice — allow only one
      setSelectedOptions([option]);
    }
  };

  const handleNext = () => {
    const correctAnswers = Array.isArray(currentQuestion.correct)
      ? currentQuestion.correct
      : [currentQuestion.correct];

    const isCorrect =
      selectedOptions.length === correctAnswers.length &&
      selectedOptions.every((opt) => correctAnswers.includes(opt));

    setAnswers([
      ...answers,
      {
        question: currentQuestion.title,
        selected: selectedOptions,
        correctAnswers,
        isCorrect,
      },
    ]);

    setSelectedOptions([]);

    if (currentIndex + 1 < questionsData.length) setCurrentIndex(currentIndex + 1);
    else setIsFinished(true);
  };

  const score = answers.filter((a) => a.isCorrect).length;
  const percentage = Math.round((score / questionsData.length) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      {!isFinished ? (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{quiz.title}</h2>
            <span className="text-gray-600 text-sm font-medium">
              Question {currentIndex + 1} / {questionsData.length}
            </span>
          </div>

          <p className="text-lg text-gray-700 font-medium">
            {currentQuestion.title}
          </p>
          <p className="text-sm text-gray-500 italic">
            {isMultiple ? "Choose all that apply" : "Choose one answer"}
          </p>

          <div className="grid gap-3 mt-4">
            {currentQuestion.options.map((option, i) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(option)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-xl border-2 transition font-medium ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="w-full bg-gray-200 h-2 rounded-full mr-4">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${((currentIndex + 1) / questionsData.length) * 100}%`,
                }}
              ></div>
            </div>

            <button
              onClick={handleNext}
              disabled={selectedOptions.length === 0}
              className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
                selectedOptions.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {currentIndex + 1 === questionsData.length ? "Finish" : "Next"}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 text-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-800">🎉 Quiz Finished!</h2>
          <p className="text-gray-700 text-lg">
            Your Score:{" "}
            <span className="font-semibold">{score}</span> / {questionsData.length}
          </p>
          <p className="text-blue-600 font-bold text-2xl">{percentage}%</p>

          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-blue-600"
            ></motion.div>
          </div>

          <div className="space-y-4 mt-6">
            {answers.map((a, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl text-left ${
                  a.isCorrect
                    ? "bg-green-50 border border-green-400"
                    : "bg-red-50 border border-red-400"
                }`}
              >
                <p className="font-medium text-gray-800">
                  {i + 1}. {a.question}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Your answers: {a.selected.join(", ")}
                </p>
                {!a.isCorrect && (
                  <p className="text-sm text-green-700 mt-1">
                    Correct answers: {a.correctAnswers.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            Back to Quizzes
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default QuizPage;
