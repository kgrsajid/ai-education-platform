import { Input, Segmented } from "antd";
import { type FC } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetQuizCategoryQuery } from "../../../features/query/quiz";

type Props = {
  search: string;
  handleSearch: (value: string) => void;
  section: "all" | "my";
  onSectionChange: (value: "all" | "my") => void;
};

export const CardTop: FC<Props> = ({ search, handleSearch, section, onSectionChange }) => {
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
      {/* Search + section toggle row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-2xl">
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 pointer-events-none"
            style={{ fontSize: "1.25rem" }}
          >
            search
          </span>
          <Input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search flashcard sets..."
            size="large"
            allowClear
            style={{ paddingLeft: 44 }}
            className="rounded-xl"
          />
        </div>

        <Segmented
          options={[
            { label: "All Sets", value: "all" },
            { label: "My Sets", value: "my" },
          ]}
          value={section}
          onChange={onSectionChange}
        />
      </div>

      {/* Category chips */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              !activeCategoryId
                ? "bg-[#1152d4] text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
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
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
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
