import type { FC } from "react";
import type { TQuizDetails } from "../../../features/api/quiz/type";

type Props = {
  quiz: TQuizDetails
}
export const QuizSampleQuestions:FC<Props> = ({quiz}) => {
  return (
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
  );
}