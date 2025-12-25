import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
  HelpCircle,
} from "lucide-react";
import {
  useGetAllUserQuizResult,
  useGetQuizByIdQuery,
} from "../../../../features/query/quiz";
import { RadialScore } from "../../../../features/quiz/chart/radial-score";
import { ProgressChart } from "../../../../features/quiz/chart/progress-chart";
import { QuizInfoTop } from "../../quiz-info-top/index.tsx";
import { QuizRole } from "../../quiz-rule/index.tsx";

export const QuizDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: quiz, isLoading } = useGetQuizByIdQuery(id);
  const { data: quizResultData, isLoading: quizResultLoading } =
    useGetAllUserQuizResult({ testId: quiz?.id });

  const results = quizResultData || [];

  const bestResult =
    results.length > 0 ? Math.max(...results.map((r) => r.percentage)) : 0;

  const lastAttempt = results.length > 0 ? results[results.length - 1] : null;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading quiz details...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Quiz not found 😢
      </div>
    );
  }

  const estimatedTime = Math.ceil(quiz.questions.length * 1.5);

  return (
    <div className="px-8 py-12">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-10"
      >
        <ArrowLeft size={18} />
      </button>

      {/* HERO */}
      <QuizInfoTop quiz={quiz}/>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Questions</p>
          <p className="text-3xl font-bold text-gray-800">
            {quiz.questions.length}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Estimated time</p>
          <p className="text-2xl font-semibold">~{estimatedTime} min</p>
        </div>
      </div>
      
      {!quizResultLoading && results.length > 0 && (
        <>
          {/* SUMMARY */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <p className="text-sm text-gray-500">Attempts</p>
              <p className="text-3xl font-bold">{results.length}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <p className="text-sm text-gray-500">Best result</p>
              <p className="text-3xl font-bold text-green-600">{bestResult}%</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <p className="text-sm text-gray-500">Last attempt</p>
              <p className="text-3xl font-bold">{lastAttempt?.percentage}%</p>
            </div>
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
            <div className="lg:col-span-2">
              <ProgressChart
                data={results.map((r) => ({
                  attempt: r.attempt,
                  percentage: r.percentage,
                }))}
              />
            </div>

            {lastAttempt && <RadialScore percentage={lastAttempt.percentage} />}
          </div>
        </>
      )}

      {/* SAMPLE QUESTIONS */}
      <div className="bg-white rounded-3xl p-8 border shadow-sm mb-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Sample questions
        </h2>

        <ul className="space-y-4">
          {quiz.questions.slice(0, 3).map((q, index) => (
            <li
              key={index}
              className="p-4 rounded-xl bg-gray-50 border text-gray-700"
            >
              {index + 1}. {q.question}
            </li>
          ))}
        </ul>

        {quiz.questions.length > 3 && (
          <p className="mt-4 text-sm text-gray-500">
            + {quiz.questions.length - 3} more questions
          </p>
        )}
      </div>

      {/* RULES */}
      <QuizRole/>
      {/* FINAL CTA */}
      <div className="flex justify-center mt-20">
        <button
          onClick={() => navigate(`/quiz/${quiz.id}/start`)}
          className="flex items-center gap-4 bg-indigo-600 hover:bg-indigo-700 text-white px-14 py-5 rounded-3xl text-xl font-bold transition shadow-xl"
        >
          <PlayCircle size={26} />
          Start Quiz Now
        </button>
      </div>
    </div>
  );
};

