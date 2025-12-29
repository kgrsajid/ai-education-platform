import { Button, Input } from "antd";
import { FilterIcon, Plus, Search } from "lucide-react";
import { useState, type FC } from "react";
import { FilterModal } from "../filterModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  search: string;
  handleSearch: (value: string) => void;
}
export const QuizTop:FC<Props> = ({search, handleSearch}) => {
  const [isFiltrerOpen, setIsFilterOpen] = useState(false);
  const {t} = useTranslation();
  const navigate = useNavigate();
  const handleClose = () => {
    setIsFilterOpen(false);
  }
  const handleOpen = () => {
    setIsFilterOpen(true);
  }
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mb-10">
      <Input
        placeholder={t("quiz.phrases.search")}
        prefix={<Search size={18} className="text-gray-400" />}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="rounded-2xl w-full sm:w-80 shadow-md"
        size="large"
        allowClear
      />
      <Button onClick={handleOpen} className="rounded-full w-[40px] h-[40px] p-0 flex justify-center items-center">
        <FilterIcon className="w-[15px]"/>
      </Button>
      <Button
        onClick={() => navigate("/quiz/create")}
        type="primary"
        className="flex justify-center items-center"
      >
        {t("quiz.words.create")} 
        <Plus size={15}/>
      </Button>
      <FilterModal open={isFiltrerOpen} handleClose={handleClose}/>
    </div>
  );
}