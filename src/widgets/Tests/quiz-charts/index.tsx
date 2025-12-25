import type { FC } from "react";
import type { TQuizResultResponse } from "../../../features/api/quiz/type";
import { ProgressChart } from "../../../features/quiz/chart/progress-chart";
import { RadialScore } from "../../../features/quiz/chart/radial-score";

type Props = {
  results: TQuizResultResponse[];
  lastAttempt: TQuizResultResponse | null;
}
export const QuizCharts:FC<Props> = ({results, lastAttempt}) => {
  return (
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
  );
}