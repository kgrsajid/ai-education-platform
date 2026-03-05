import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAddQuizResultMutation,
  useGetQuizByIdQuery,
} from "../../../../features/query/quiz";
import type { TQuizResultAddPayload } from "../../../../features/api/quiz/type";
import { QuizQuestion } from "../../../../features/quiz/quiz-question";
import { QuizResult, type AnswerResult } from "../../../../features/quiz/quiz-result";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: quiz, isLoading } = useGetQuizByIdQuery(id);
  const addResultMutation = useAddQuizResultMutation();

  const [startTime] = useState(() => new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-400">
        Loading quiz...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-400">
        Quiz not found
      </div>
    );
  }

  const questions = quiz.questions;
  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (!selectedOption) return;

    const correctOption = currentQuestion.options.find((o) => o.isCorrect);
    const isCorrect = selectedOption === correctOption?.optionText;

    const newAnswers: AnswerResult[] = [
      ...answers,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: correctOption?.optionText || "",
        isCorrect,
      },
    ];

    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const finishTime = new Date();
      const durationSec = Math.floor(
        (finishTime.getTime() - startTime.getTime()) / 1000
      );
      const score = newAnswers.filter((a) => a.isCorrect).length;

      const payload: TQuizResultAddPayload = {
        startedAt: startTime.toISOString(),
        finishedAt: finishTime.toISOString(),
        score,
        maxScore: questions.length,
        testId: quiz.id,
        durationSec,
      };

      addResultMutation.mutate(payload);
      setIsFinished(true);
    }
  };

  const score = answers.filter((a) => a.isCorrect).length;
  const percentage = isFinished
    ? Math.round((score / questions.length) * 100)
    : 0;

  if (isFinished) {
    return (
      <QuizResult
        quizTitle={quiz.title}
        answers={answers}
        score={score}
        totalQuestions={questions.length}
        percentage={percentage}
        onBack={() => navigate(-1)}
      />
    );
  }

  return (
    <QuizQuestion
      quizTitle={quiz.title}
      question={currentQuestion}
      questionIndex={currentIndex}
      totalQuestions={questions.length}
      selectedOption={selectedOption}
      onSelect={setSelectedOption}
      onNext={handleNext}
    />
  );
};

export default QuizPage;
