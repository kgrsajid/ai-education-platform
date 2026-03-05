import { Input } from "antd";
import { type FC } from "react";
import { useState } from "react";
import { FilterModal } from "../filterModal";
import { useGetQuizCategoryQuery } from "../../query/quiz";
import { useSearchParams } from "react-router-dom";

type Props = {
  search: string;
  handleSearch: (value: string) => void;
};

export const QuizTop: FC<Props> = ({ search, handleSearch }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: categories } = useGetQuizCategoryQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryId = searchParams.get("categories");

  const handleCategoryClick = (id: number | null) => {
    const params = new URLSearchParams(searchParams);
    if (id === null) {
      params.delete("categories");
    } else {
      params.set("categories", String(id));
    }
    setSearchParams(params);
  };

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
            placeholder="Search for tests by title or keyword..."
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
          Filters
        </button>

        <FilterModal open={isFilterOpen} handleClose={() => setIsFilterOpen(false)} />
      </div>

      {/* Category chips */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {/* "All" chip */}
          <button
            onClick={() => handleCategoryClick(null)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              !activeCategoryId
                ? "bg-[#1152d4] text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            All Categories
          </button>

          {categories.map((cat) => {
            const isActive = activeCategoryId === String(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#1152d4] text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
