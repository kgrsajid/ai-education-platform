import { useState } from "react";
import { Button, Pagination, Segmented, Skeleton } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetAllQuizQuery } from "../../../features/query/quiz";
import { QuizCard } from "../../../features/quiz/card";
import { QuizTop } from "../../../features/quiz/top/top-part";
import { useTranslation } from "react-i18next";

const QuizListPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [searchParams, setSearchParams] = useSearchParams();

  const sectionParam = searchParams.get("section");
  const section: "all" | "my" = sectionParam === "my" ? "my" : "all";

  const handleSectionChange = (value: "all" | "my") => {
    const params = new URLSearchParams(searchParams);
    params.set("section", value);
    setSearchParams(params);
    setPagination((p) => ({ ...p, page: 1 }));
  };

  const categories = searchParams.get("categories");
  const difficulty = searchParams.get("difficulty");
  const minQ = searchParams.get("minQ");
  const maxQ = searchParams.get("maxQ");

  const { data: quizData, isLoading } = useGetAllQuizQuery({
    page: pagination.page,
    limit: pagination.limit,
    search,
    categories: categories ? categories.split(",").map(Number) : undefined,
    difficulty: difficulty || undefined,
    minQ: minQ ? Number(minQ) : undefined,
    maxQ: maxQ ? Number(maxQ) : undefined,
    isPrivate: section === "my" ? true : undefined,
  });

  const data = quizData?.data ?? [];
  const total = quizData?.total ?? 0;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      {/* Page title + CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100 m-0">
            {t("quiz.phrases.listPage.title")}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 mb-0">
            {t("quiz.phrases.listPage.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Segmented
            options={[
              { label: t("quiz.phrases.listPage.allTests"), value: "all" },
              { label: t("quiz.phrases.listPage.myTests"), value: "my" },
            ]}
            value={section}
            onChange={handleSectionChange}
          />
          <Button
            type="primary"
            size="large"
            icon={<span className="material-symbols-outlined" style={{ fontSize: '1.1rem', lineHeight: 1 }}>add</span>}
            onClick={() => navigate("/quiz/create")}
            className="flex items-center gap-1"
          >
            {t("quiz.phrases.listPage.createTest")}
          </Button>
        </div>
      </div>

      {/* Search + category chips */}
      <QuizTop search={search} handleSearch={setSearch} />

      {/* Quiz cards grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
              <Skeleton active paragraph={{ rows: 4 }} />
            </div>
          ))}
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '2rem' }}>search_off</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">{t("quiz.phrases.listPage.noTestsFound")}</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">{t("common.tryAdjusting")}</p>
        </div>
      )}

      {/* Pagination */}
      {total > pagination.limit && (
        <div className="flex justify-center mt-10">
          <Pagination
            current={pagination.page}
            pageSize={pagination.limit}
            total={total}
            onChange={(page, pageSize) => setPagination({ page, limit: pageSize })}
            showSizeChanger
          />
        </div>
      )}
    </div>
  );
};

export default QuizListPage;
