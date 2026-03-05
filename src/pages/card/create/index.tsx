import {
  Form,
  Input,
  Button,
  Select,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect, useMemo, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { TagsInput } from "../../../features/quiz/tags-input";
import { useGetQuizCategoryQuery } from "../../../features/query/quiz";
import type { QuizCategory } from "../../../features/api/quiz-category/type";
import type { CardsCreatePayload } from "../../../features/api/card/type";
import {
  useCreateCardMutation,
  useGetCardByIdQuery,
  useUpdateCardMutation,
} from "../../../features/query/card";

type Props = {
  isEdit?: boolean;
};

export const CardsCreatePage: FC<Props> = ({ isEdit = false }) => {
  const [form] = Form.useForm<CardsCreatePayload>();
  const navigate = useNavigate();
  const { state } = useLocation();

  const cardsId = state?.cardId;

  const { data: cards, isLoading } = useGetCardByIdQuery(cardsId);
  const createMutation = useCreateCardMutation();
  const updateMutation = useUpdateCardMutation();

  const { data: categoryData, isLoading: isCategoryLoading } = useGetQuizCategoryQuery();

  const categoryOptions = useMemo(
    () =>
      categoryData?.map((c: QuizCategory) => ({
        label: c.name,
        value: c.id,
      })),
    [categoryData]
  );

  useEffect(() => {
    if (!isEdit || !cards) return;
    form.setFieldsValue({
      title: cards.title,
      description: cards.description,
      tags: cards.tags ?? [],
      categories: (cards.categories ?? []).map((c) => c.id),
      cards: cards.cards.map((card) => ({
        question: card.question,
        answer: card.answer,
      })),
    });
  }, [isEdit, form, cards]);

  const onFinish = (values: CardsCreatePayload) => {
    const payload: CardsCreatePayload = {
      title: values.title,
      description: values.description || undefined,
      tags: values.tags ?? [],
      categories: values.categories,
      cards: values.cards,
    };

    if (isEdit) {
      updateMutation.mutate({ cardId: cardsId, card: payload });
      navigate(`/cards/${cardsId}`);
    } else {
      createMutation.mutate(payload);
      navigate("/cards");
    }
  };

  if (isEdit && isLoading) {
    return (
      <div className="flex items-center justify-center h-60">
        <span className="text-slate-400">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-2/3 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#1152d4]">style</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Flashcards
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">
          {isEdit ? "Edit Card Set" : "Create Card Set"}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {isEdit
            ? "Update your flashcard set"
            : "Build a new flashcard set to study smarter"}
        </p>
      </div>

      <Form<CardsCreatePayload>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onKeyPress={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        initialValues={
          isEdit
            ? undefined
            : {
                tags: [],
                cards: [{ question: "", answer: "" }],
              }
        }
      >
        {/* General Info Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-5">
            General Information
          </h2>

          <Form.Item
            name="title"
            label={<span className="text-slate-300 text-sm font-medium">Title</span>}
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input
              size="large"
              placeholder="e.g. JavaScript Fundamentals"
              style={{
                background: "rgb(15 23 42 / 0.6)",
                borderColor: "rgb(51 65 85)",
                color: "#e2e8f0",
              }}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="text-slate-300 text-sm font-medium">Description</span>}
          >
            <Input.TextArea
              rows={3}
              placeholder="What is this card set about?"
              style={{
                background: "rgb(15 23 42 / 0.6)",
                borderColor: "rgb(51 65 85)",
                color: "#e2e8f0",
                resize: "none",
              }}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="categories"
              label={<span className="text-slate-300 text-sm font-medium">Categories</span>}
              rules={[{ required: true, message: "Pick at least one category" }]}
            >
              <Select
                mode="multiple"
                size="large"
                options={categoryOptions}
                loading={isCategoryLoading}
                placeholder="Select categories"
                style={{ background: "rgb(15 23 42 / 0.6)" }}
              />
            </Form.Item>

            <Form.Item
              name="tags"
              label={<span className="text-slate-300 text-sm font-medium">Tags</span>}
              valuePropName="value"
            >
              <TagsInput />
            </Form.Item>
          </div>
        </div>

        {/* Cards */}
        <Form.List name="cards">
          {(fields, { add, remove }) => (
            <div className="space-y-4">
              {fields.map(({ key, name, ...rest }, idx) => (
                <div
                  key={key}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#1152d4]/20 flex items-center justify-center">
                        <span className="text-[#1152d4] text-xs font-bold">{idx + 1}</span>
                      </div>
                      <span className="text-slate-300 text-sm font-semibold">Card {idx + 1}</span>
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(name)}
                        className="text-slate-600 hover:text-rose-400 transition-colors"
                      >
                        <MinusCircleOutlined style={{ fontSize: "1rem" }} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <Form.Item
                      {...rest}
                      name={[name, "question"]}
                      label={
                        <span className="text-[#1152d4] text-xs font-bold uppercase tracking-widest">
                          Question
                        </span>
                      }
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter question"
                        style={{
                          background: "rgb(15 23 42 / 0.6)",
                          borderColor: "rgb(51 65 85)",
                          color: "#e2e8f0",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      {...rest}
                      name={[name, "answer"]}
                      label={
                        <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">
                          Answer
                        </span>
                      }
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input.TextArea
                        rows={2}
                        placeholder="Enter answer"
                        style={{
                          background: "rgb(15 23 42 / 0.6)",
                          borderColor: "rgb(51 65 85)",
                          color: "#e2e8f0",
                          resize: "none",
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => add({ question: "", answer: "" })}
                className="w-full py-4 border border-dashed border-slate-700 rounded-xl
                           text-slate-500 hover:text-slate-300 hover:border-[#1152d4]/50
                           transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <PlusOutlined />
                Add another card
              </button>
            </div>
          )}
        </Form.List>

        {/* Submit */}
        <div className="mt-8 flex justify-end gap-3">
          <Button
            size="large"
            onClick={() => navigate("/cards")}
            style={{
              background: "transparent",
              borderColor: "rgb(51 65 85)",
              color: "#94a3b8",
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ background: "#1152d4", borderColor: "#1152d4" }}
            className="font-semibold px-8"
          >
            {isEdit ? "Save Changes" : "Create Set"}
          </Button>
        </div>
      </Form>
    </div>
  );
};
