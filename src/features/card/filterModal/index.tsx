import { Modal, Select, Slider, Button, Space } from "antd";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { useGetQuizCategoryQuery } from "../../query/quiz";
import { useSearchParams } from "react-router-dom";

type Props = {
  open: boolean;
  handleClose: () => void;
};

type Filters = {
  categories: number[];
  questionsRange: [number, number];
};

const defaultRange = {
  min: 1,
  max: 100,
};

export const CardFilterModal: FC<Props> = ({ open, handleClose }) => {
  const { data: categoryData, isLoading: isCategoryLoading } = useGetQuizCategoryQuery();
  const categoryOptions = useMemo(() => {
    return categoryData?.map((val) => ({ label: val.name, value: val.id }));
  }, [categoryData]);

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    questionsRange: [defaultRange.min, defaultRange.max],
  });

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const categoriesParam = searchParams.get("categories");
    const minQParam = searchParams.get("minQ");
    const maxQParam = searchParams.get("maxQ");

    setFilters({
      categories: categoriesParam ? categoriesParam.split(",").map(Number) : [],
      questionsRange: [
        minQParam ? Number(minQParam) : defaultRange.min,
        maxQParam ? Number(maxQParam) : defaultRange.max,
      ],
    });
  }, [searchParams, open]);

  const handleReset = () => {
    setFilters({
      categories: [],
      questionsRange: [defaultRange.min, defaultRange.max],
    });
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);
    if (filters.categories.length) {
      params.set("categories", filters.categories.join(","));
    } else {
      params.delete("categories");
    }
    params.set("minQ", String(filters.questionsRange[0]));
    params.set("maxQ", String(filters.questionsRange[1]));
    setSearchParams(params);
    handleClose();
  };

  return (
    <Modal open={open} onCancel={handleClose} title="Filters" footer={null}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <div style={{ marginBottom: 8 }}>Categories</div>
          <Select
            mode="multiple"
            allowClear
            placeholder="Select categories..."
            options={categoryOptions}
            loading={isCategoryLoading}
            value={filters.categories}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, categories: value }))
            }
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <div style={{ marginBottom: 8 }}>
            Number of cards: {filters.questionsRange[0]}–{filters.questionsRange[1]}
          </div>
          <Slider
            range
            min={1}
            max={100}
            value={filters.questionsRange}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                questionsRange: value as [number, number],
              }))
            }
          />
        </div>

        <Space style={{ justifyContent: "flex-end", width: "100%" }}>
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" onClick={handleApply}>
            Apply
          </Button>
        </Space>
      </Space>
    </Modal>
  );
};
