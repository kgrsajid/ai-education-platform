import { useState } from "react";
import { quizzes } from "../../data";
import { QuizTop } from "../../../../features/quiz/top/top-part";
import { useGetAllQuizQuery } from "../../../../features/query/quiz";
import { QuizCard } from "../../../../features/quiz/card";

const QuizListPage = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({page: 0, limit: 10});
  const [filter, setFilter] = useState("All");
  const {data: quizData, isLoading} = useGetAllQuizQuery({...pagination, search});
  const categories = ["All", ...new Set(quizzes.map((q) => q.category))];

  const data = quizData?.data ?? [];
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-800 tracking-tight">
        Explore Our <span className="text-blue-600">Quizzes</span>
      </h1>
      {/* 🔍 Search & Filter */}
      <QuizTop
        search={search}
        filter={filter}
        handleSearch={setSearch}
        HandleFilter={setFilter}
        categories={categories}
      />
      {/* 🧩 Quiz Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((quiz) => (
          <QuizCard quiz={quiz}/>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center mt-16 text-gray-500">
          No quizzes found 😔
        </div>
      )}
    </div>
  );
};

export default QuizListPage;
