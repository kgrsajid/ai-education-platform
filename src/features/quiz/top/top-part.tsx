import { Input } from "antd";
import { type FC } from "react";
import { useState } from "react";
import { FilterModal } from "../filterModal";
import { useTranslation } from "react-i18next";

type Props = {
  search: string;
  handleSearch: (value: string) => void;
};

export const QuizTop: FC<Props> = ({ search, handleSearch }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Search row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-2xl">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 pointer-events-none" style={{ fontSize: '1.25rem' }}>
            search
          </span>
          <Input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t("quiz.phrases.searchPlaceholder")}
            size="large"
            allowClear
            style={{ paddingLeft: 44 }}
            className="rounded-xl"
          />
        </div>

        {/* Advanced filter button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:border-[#1152d4] hover:text-[#1152d4] transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>tune</span>
          {t("common.filters")}
        </button>

        <FilterModal open={isFilterOpen} handleClose={() => setIsFilterOpen(false)} />
      </div>
    </div>
  );
};
