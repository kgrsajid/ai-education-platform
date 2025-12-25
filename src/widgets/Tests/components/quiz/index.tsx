import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAddQuizResultMutation, useGetQuizByIdQuery } from "../../../../features/query/quiz";
import { Button } from "antd";
import type { TQuizResultAddPayload } from "../../../../features/api/quiz/type";

type AnswerResult = {
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
};

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const date = new Date();
  const { data: quiz, isLoading } = useGetQuizByIdQuery(id);
  const addResultMutation = useAddQuizResultMutation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center text-gray-600">
        Loading quiz...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex h-screen justify-center items-center text-lg text-gray-600">
        Quiz not found 😢
      </div>
    );
  }

  const questions = quiz.questions;
  const currentQuestion = questions[currentIndex];

  const handleSelect = (optionText: string) => {
    setSelectedOption(optionText);
  };

  const addResult = () => {
    const finishTime =  new Date();
    const diffMs = finishTime.getTime() - date.getTime();
    const durationSec = Math.floor(diffMs / 1000);
    const payload:TQuizResultAddPayload = {
      startedAt: date.toISOString(),
      finishedAt: finishTime.toISOString(),
      score: score,
      maxScore: questions.length,
      testId: quiz.id,
      durationSec: durationSec
    }
    addResultMutation.mutate(payload)
  }

  const handleNext = () => {
    if (!selectedOption) return;

    const correctOption = currentQuestion.options.find(
      (o) => o.isCorrect
    );

    const isCorrect = selectedOption === correctOption?.optionText;

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: correctOption?.optionText || "",
        isCorrect,
      },
    ]);

    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      addResult();
      setIsFinished(true);
    }
  };

  const score = answers.filter((a) => a.isCorrect).length;
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      {!isFinished ? (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {quiz.title}
            </h2>
            <span className="text-sm text-gray-500">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>

          {/* Question */}
          <p className="text-lg font-medium text-gray-800 mb-6">
            {currentQuestion.question}
          </p>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.optionText;

              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleSelect(option.optionText)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-5 py-3 rounded-xl border transition font-medium ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-800 border-gray-300 hover:border-indigo-400"
                  }`}
                >
                  {option.optionText}
                </motion.button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Progress */}
            <div className="w-full h-2 bg-gray-200 rounded-full mr-4">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <Button
              type="primary"
              onClick={handleNext}
              disabled={!selectedOption}
              className={`px-6 py-2 rounded-xl font-semibold text-white transition ${
                !selectedOption
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {currentIndex + 1 === questions.length ? "Finish" : "Next"}
            </Button>
          </div>
        </motion.div>
      ) : (
        /* RESULT */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎉 Quiz Finished
          </h2>

          <p className="text-lg text-gray-700 mb-2">
            Score: <b>{score}</b> / {questions.length}
          </p>

          <p className="text-2xl font-bold text-indigo-600 mb-6">
            {percentage}%
          </p>

          {/* Result list */}
          <div className="space-y-4 text-left mb-6">
            {answers.map((a, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${
                  a.isCorrect
                    ? "bg-green-50 border-green-400"
                    : "bg-red-50 border-red-400"
                }`}
              >
                <p className="font-medium text-gray-800">
                  {i + 1}. {a.question}
                </p>
                <p className="text-sm text-gray-700">
                  Your answer: {a.selected}
                </p>
                {!a.isCorrect && (
                  <p className="text-sm text-green-700">
                    Correct answer: {a.correct}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition"
          >
            Back to quizzes
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default QuizPage;
