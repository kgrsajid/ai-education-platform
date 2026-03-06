import { useState } from "react";
import { Button, Pagination, Segmented, Skeleton } from "antd";
import { CardItem } from "../../../features/card/card";
import { useGetAllCardQuery } from "../../../features/query/card";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CardTop } from "../../../widgets/Cards/top";

export const CardsListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
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
  const minQ = searchParams.get("minQ");
  const maxQ = searchParams.get("maxQ");

  const { data: cardData, isLoading } = useGetAllCardQuery({
    page: pagination.page,
    limit: pagination.limit,
    search,
    categories: categories ? categories.split(",").map(Number) : undefined,
    minQ: minQ ? Number(minQ) : undefined,
    maxQ: maxQ ? Number(maxQ) : undefined,
    isPrivate: section === "my" ? true : undefined,
  });

  const data = cardData?.data ?? [];
  const total = cardData?.total ?? 0;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-100 m-0">
            Flashcards
          </h1>
          <p className="text-slate-400 mt-1 mb-0 text-sm">
            Study smarter with interactive flashcard sets
          </p>
        </div>
        <div className="flex gap-4">
          <Segmented
            options={[
              { label: "All Sets", value: "all" },
              { label: "My Sets", value: "my" },
            ]}
            value={section}
            onChange={handleSectionChange}
          />
          <Button
            type="primary"
            size="large"
            icon={
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "1.1rem", lineHeight: 1 }}
              >
                add
              </span>
            }
            onClick={() => navigate("/cards/create")}
            style={{ background: "#1152d4", borderColor: "#1152d4" }}
            className="flex items-center gap-1 font-semibold"
          >
            Create Set
          </Button>
        </div>
      </div>

      {/* Search + filters */}
      <CardTop
        search={search}
        handleSearch={setSearch}
        section={section}
      />

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-5"
            >
              <Skeleton active paragraph={{ rows: 4 }} />
            </div>
          ))}
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="size-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
            <span
              className="material-symbols-outlined text-slate-500"
              style={{ fontSize: "2rem" }}
            >
              style
            </span>
          </div>
          <p className="text-slate-400 font-medium">No flashcard sets found</p>
          <p className="text-slate-500 text-sm mt-1">
            Try adjusting your search or filters
          </p>
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
