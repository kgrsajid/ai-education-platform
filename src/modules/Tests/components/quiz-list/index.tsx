import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizzes } from "../../data";
import { Search, Filter } from "lucide-react";

const QuizListPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", ...new Set(quizzes.map((q) => q.category))];

  const filtered = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter === "All" || quiz.category === filter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className=" p-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
        Explore Our <span className="text-blue-600">Quizzes</span>
      </h1>

      {/* 🔍 Панель поиска и фильтра */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for a quiz..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 pl-10 pr-3 py-2 rounded-xl w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>

        <div className="relative w-full sm:w-52">
          <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 pl-10 pr-3 py-2 rounded-xl w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition appearance-none"
          >
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 🧩 Список тестов */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => navigate(`/quiz/${quiz.id}`)}
            className="group bg-white/70 backdrop-blur shadow-lg hover:shadow-2xl border border-gray-100 rounded-3xl p-6 transition transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                {quiz.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                {quiz.description}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                {quiz.category}
              </span>
              <span className="text-gray-500 text-xs">
                {quiz.questions.length} questions
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center mt-16 text-gray-500">
          No quizzes found 😔
        </div>
      )}
    </div>
  );
};

export default QuizListPage;
