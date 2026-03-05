import type { FC } from "react";

type Props = {
  title: string;
  value: string | number;
  icon?: string;
};

export const QuizStat: FC<Props> = ({ title, value, icon }) => {
  return (
    <div className="flex flex-col gap-1 p-5 rounded-xl border border-slate-800 bg-slate-900/50">
      <span className="text-slate-400 text-sm font-medium">{title}</span>
      <p className="text-2xl font-bold text-white flex items-center gap-2">
        {value}
        {icon && (
          <span className="material-symbols-outlined text-amber-500 text-xl">
            {icon}
          </span>
        )}
      </p>
    </div>
  );
};
