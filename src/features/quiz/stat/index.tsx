import type { FC } from "react";

type Props = {
  title: string;
  value: string | number;
}
export const QuizStat:FC<Props> = ({title, value}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border shadow-sm">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
}