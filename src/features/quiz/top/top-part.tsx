import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { Filter, Search } from "lucide-react";
import type { FC } from "react";

type Props = {
  search: string;
  handleSearch: (value: string) => void;
  categories: string[];
  filter: string;
  HandleFilter: (value: string) => void;
}
export const QuizTop:FC<Props> = ({search, handleSearch, categories, filter, HandleFilter}) => {
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mb-10">
      <Input
        placeholder="Search for a quiz..."
        prefix={<Search size={18} className="text-gray-400" />}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="rounded-2xl w-full sm:w-80 shadow-md"
        size="large"
        allowClear
      />
      <Select
        value={filter}
        onChange={(value) => HandleFilter(value)}
        className="w-full sm:w-52 rounded-2xl shadow-md"
        size="large"
        suffixIcon={<Filter size={18} className="text-gray-400" />}
      >
        {categories.map((cat) => (
          <Option value={cat}>
            {cat}
          </Option>
        ))}
      </Select>
    </div>
  );
}