import { useState } from "react";
import { CardItem } from "../../../features/card/card";
import { useGetAllCardQuery } from "../../../features/query/card";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "antd";
import { CardTop } from "../../../widgets/Cards/top";

export const CardsListPage = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = searchParams.get("categories");

  const setCategories = (value: number[]) => {
    searchParams.set("categories", value.join(","));
    setSearchParams(searchParams);
  }

  const {data: cardData, isLoading} = useGetAllCardQuery({
    page: pagination.page,
    limit: pagination.limit,
    search,
    categories: categories ? categories.split(",").map(Number) : undefined,
  });
  const data = cardData?.data ?? [];
  const total = cardData?.total ?? 0;
  return(
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 tracking-tight">
        <span className="text-blue-600">Flashcards</span>
      </h1>
      <CardTop search={search} handleSearch={setSearch} setCategories={setCategories}/>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : data.length > 0 ? (
          data.map((card) => <CardItem key={card.id} card={card} />)
        ) : (
          <div className="text-center mt-16 text-gray-500">No cards found 😔</div>
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
}