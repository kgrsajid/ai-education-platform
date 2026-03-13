import { useParams, useNavigate, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import {
  useAddQuizViewMutation,
  useGetAllUserQuizResult,
  useGetQuizByIdQuery,
} from "../../../../features/query/quiz";
import { QuizDetailHeader } from "../../../../features/quiz/detail-header";
import { QuizDetailMetrics } from "../../../../features/quiz/detail-metrics";
import { PerformanceBarChart } from "../../../../features/quiz/detail-performance-chart";
import { QuizDetailSideStats } from "../../../../features/quiz/detail-side-stats";
import { QuizAttemptsTable } from "../../../../features/quiz/detail-attempts-table";
import { useTranslation } from "react-i18next";

export const QuizDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: quiz, isLoading } = useGetQuizByIdQuery(id);
  const { data: quizResultData, isLoading: quizResultLoading } =
    useGetAllUserQuizResult({ testId: quiz?.id });

  const viewMutation = useAddQuizViewMutation();
  const results = quizResultData || [];

  const handleStart = () => {
    if (!quiz) return;
    viewMutation.mutate(quiz.id);
    navigate(`/quiz/${quiz.id}/start`);
  };

  const bestResult =
    results.length > 0 ? Math.max(...results.map((r) => r.percentage)) : 0;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-400">
        {t('quiz.phrases.detailPage.loadingDetails')}
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-400">
        {t('quiz.phrases.detailPage.notFound')}
      </div>
    );
  }

  return (
    <div className="w-[1200px] mx-auto p-8">
      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-6"
        items={[
          {
            title: (
              <Link
                to="/quiz"
                className="text-slate-400 hover:text-primary transition-colors"
              >
                {t('quiz.phrases.detailPage.tests')}
              </Link>
            ),
          },
          {
            title: (
              <span className="text-slate-100 font-medium">{quiz.title}</span>
            ),
          },
        ]}
      />

      {/* Header: title, description, tags, start button */}
      <QuizDetailHeader quiz={quiz} onStart={handleStart} />

      {/* Metrics: difficulty, questions, time */}
      <QuizDetailMetrics quiz={quiz} />

      {/* Stats section — only when user has attempts */}
      {!quizResultLoading && results.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PerformanceBarChart results={results} />
            </div>
            <QuizDetailSideStats results={results} bestScore={bestResult} />
          </div>

          <QuizAttemptsTable results={results} />
        </>
      )}
    </div>
  );
};
