import { Button, Input } from "antd";
import { Plus, Search } from "lucide-react";
import {  type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetQuizCategoryQuery } from "../../../features/query/quiz";
import NavCategories from "../../../features/category";

type Props = {
  search: string;
  handleSearch: (value: string) => void;
  setCategories: (value: number[]) => void;
}
export const CardTop:FC<Props> = ({search, handleSearch, setCategories}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {data: categoryData, isLoading} = useGetQuizCategoryQuery();
  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-3">
        <Input
          placeholder={t("quiz.phrases.search")}
          prefix={<Search size={18} className="text-gray-400" />}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="rounded-2xl w-full sm:w-80 shadow-md"
          size="large"
          allowClear
        />
        <Button
          onClick={() => navigate("/cards/create")}
          type="primary"
          className="flex justify-center items-center"
        >
          {t("quiz.words.create")} 
          <Plus size={15}/>
        </Button>
      </div>
      <div className="w-[50%]">
        <NavCategories setCategories={setCategories} isLoading={isLoading} categoryData={categoryData}/>
      </div>
    </div>
  );
}