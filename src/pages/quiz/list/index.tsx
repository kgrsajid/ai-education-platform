import { useState } from "react";
import { Pagination, Segmented } from "antd";
import { useSearchParams } from "react-router-dom";
import { useGetAllQuizQuery } from "../../../features/query/quiz";
import { QuizCard } from "../../../features/quiz/card";
import { QuizTop } from "../../../features/quiz/top/top-part";

const QuizListPage = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [searchParams, setSearchParams] = useSearchParams();

  // Получаем параметр section из URL
  const sectionParam = searchParams.get("section");
  const section: "all" | "my" = sectionParam === "my" ? "my" : "all";

  // Изменяем секцию
  const handleSectionChange = (value: "all" | "my") => {
    searchParams.set("section", value);
    setSearchParams(searchParams);
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
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 tracking-tight">
        <span className="text-blue-600">Quizzes</span>
      </h1>

      {/* 🔘 Segmented для выбора секции */}
      <Segmented
        options={[
          { label: "Все тесты", value: "all" },
          { label: "Мои тесты", value: "my" },
        ]}
        value={section}
        onChange={handleSectionChange}
        className="mb-6"
      />

      {/* 🔍 Search & Filter */}
      <QuizTop search={search} handleSearch={setSearch} />

      {/* 🧩 Quiz Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : data.length > 0 ? (
          data.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
        ) : (
          <div className="text-center mt-16 text-gray-500">No quizzes found 😔</div>
        )}
      </div>

      {/* 📄 Pagination */}
      {total > pagination.limit && (
        <div className="flex justify-center mt-8">
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
