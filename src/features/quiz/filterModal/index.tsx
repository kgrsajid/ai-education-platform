import { Modal, Select, Radio, Slider, Button, Space } from "antd";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { useGetQuizCategoryQuery } from "../../query/quiz";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  handleClose: () => void;
};

type Filters = {
  categories: number[];
  difficulty: "easy" | "medium" | "hard" | null;
  questionsRange: [number, number];
};
const defaultRange = {
  min: 1,
  max: 100
}

export const FilterModal: FC<Props> = ({ open, handleClose }) => {
  const {t} = useTranslation();
  const {data: categoryData, isLoading: isCategoryLoading} = useGetQuizCategoryQuery();
  const categoryOptions = useMemo(() => {
    return categoryData?.map(val => ({label: val.name, value: val.id}));
  },[categoryData]);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    difficulty: null,
    questionsRange: [defaultRange.min, defaultRange.max],
  });

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const categoriesParam = searchParams.get("categories");
    const difficultyParam = searchParams.get("difficulty");
    const minQParam = searchParams.get("minQ");
    const maxQParam = searchParams.get("maxQ");

    setFilters({
      categories: categoriesParam
        ? categoriesParam.split(",").map(Number)
        : [],
      difficulty: difficultyParam as Filters["difficulty"] | null,
      questionsRange: [
        minQParam ? Number(minQParam) : defaultRange.min,
        maxQParam ? Number(maxQParam) : defaultRange.max,
      ],
    });
  }, [searchParams, open]);

  const handleReset = () => {
    setFilters({
      categories: [],
      difficulty: null,
      questionsRange: [defaultRange.min, defaultRange.max],
    });
  };
  const handleApply = () => {
    const params = new URLSearchParams();
    if (filters.categories.length) {
      params.set("categories", filters.categories.join(","));
    }
    if (filters.difficulty) {
      params.set("difficulty", filters.difficulty);
    }

    params.set("minQ", String(filters.questionsRange[0]));
    params.set("maxQ", String(filters.questionsRange[1]));
    setSearchParams(params);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={t("quiz.words.filter.filters")}
      footer={null}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Категории */}
        <div>
          <div style={{ marginBottom: 8 }}>{t("quiz.words.filter.categories")}</div>
          <Select
            mode="multiple"
            allowClear
            placeholder={t("quiz.phrases.filter.categoryPlaceholder")}
            options={categoryOptions}
            loading={isCategoryLoading}
            value={filters.categories}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, categories: value }))
            }
            style={{ width: "100%" }}
          />
        </div>

        {/* Сложность */}
        <div>
          <div style={{ marginBottom: 8 }}>{t("quiz.words.difficulty")}</div>
          <Radio.Group
            value={filters.difficulty}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                difficulty: e.target.value,
              }))
            }
          >
            <Radio value="easy">{t("quiz.words.diff.easy")}</Radio>
            <Radio value="medium">{t("quiz.words.diff.medium")}</Radio>
            <Radio value="hard">{t("quiz.words.diff.hard")}</Radio>
          </Radio.Group>
        </div>

        {/* Диапазон вопросов */}
        <div>
          <div style={{ marginBottom: 8 }}>
            {t("quiz.phrases.filter.numberOfQuestions")} {filters.questionsRange[0]}–{filters.questionsRange[1]}
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

        {/* Кнопки */}
        <Space style={{ justifyContent: "flex-end", width: "100%" }}>
          <Button onClick={handleReset}>Сбросить</Button>
          <Button type="primary" onClick={handleApply}>
            {t("quiz.words.filter.apply")}
          </Button>
        </Space>
      </Space>
    </Modal>
  );
};
