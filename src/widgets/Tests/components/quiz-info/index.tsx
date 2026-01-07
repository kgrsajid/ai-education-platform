import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
} from "lucide-react";
import {
  useAddQuizViewMutation,
  useGetAllUserQuizResult,
  useGetQuizByIdQuery,
} from "../../../../features/query/quiz";
import { QuizInfoTop } from "../../quiz-info-top/index.tsx";
import { QuizRole } from "../../quiz-rule/index.tsx";
import { QuizSampleQuestions } from "../../quiz-sample-questions/index.tsx";
import { QuizCharts } from "../../quiz-charts/index.tsx";
import { QuizStat } from "../../../../features/quiz/stat/index.tsx";

export const QuizDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: quiz, isLoading } = useGetQuizByIdQuery(id);
  const { data: quizResultData, isLoading: quizResultLoading } =
    useGetAllUserQuizResult({ testId: quiz?.id });
  const viewMutation = useAddQuizViewMutation();
  const results = quizResultData || [];

  const handleStart = () => {
    if(!quiz) return;
    viewMutation.mutate(quiz.id);
    navigate(`/quiz/${quiz.id}/start`);
  }
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
        onClick={() => navigate('/quiz')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-10"
      >
        <ArrowLeft size={18} />
      </button>

      {/* HERO */}
      <QuizInfoTop handleStart={handleStart} quiz={quiz}/>

      {/* STATS */}
      {
        quizResultLoading || results.length <= 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <QuizStat title="Questions" value={quiz.questions.length}/>
            <QuizStat title="Estimated time" value={`~${estimatedTime} min`}/>
          </div>
        )

      }
      
      {!quizResultLoading && results.length > 0 && (
        <>
          {/* SUMMARY */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
            <QuizStat title="Questions" value={quiz.questions.length}/>
            <QuizStat title="Estimated time" value={`~${estimatedTime} min`}/>
            <QuizStat title="Attempts" value={results.length}/>
            <QuizStat title="Best result" value={`${bestResult}%`}/>
          </div>

          {/* CHARTS */}
          <QuizCharts
            lastAttempt={lastAttempt}
            results={results}
          />
        </>
      )}

      {/* SAMPLE QUESTIONS */}
      <QuizSampleQuestions quiz={quiz}/>

      {/* RULES */}
      <QuizRole/>
      {/* FINAL CTA */}
      <div className="flex justify-center mt-20">
        <button
          onClick={handleStart}
          className="flex items-center gap-4 bg-indigo-600 hover:bg-indigo-700 text-white px-14 py-5 rounded-3xl text-xl font-bold transition shadow-xl"
        >
          <PlayCircle size={26} />
          Start Quiz Now
        </button>
      </div>
    </div>
  );
};

