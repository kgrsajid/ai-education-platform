import {
  Form,
  Input,
  Button,
  Card,
  Space,
  Divider,
  Select,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect, useMemo, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

import { TagsInput } from "../../../features/quiz/tags-input";
import { useGetQuizCategoryQuery } from "../../../features/query/quiz";
import type { QuizCategory } from "../../../features/api/quiz-category/type";
import type { CardsCreatePayload } from "../../../features/api/card/type";
import { useCreateCardMutation, useGetCardByIdQuery, useUpdateCardMutation } from "../../../features/query/card";

type Props = {
  isEdit?: boolean;
};

export const CardsCreatePage:FC<Props> = ({ isEdit = false }) => {
  const [form] = Form.useForm<CardsCreatePayload>();
  const navigate = useNavigate();
  const { state } = useLocation();
  // const { t } = useTranslation();

  const cardsId = state?.cardId;

  const { data: cards, isLoading } = useGetCardByIdQuery(cardsId);
  const createMutation = useCreateCardMutation();
  const updateMutation = useUpdateCardMutation();

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetQuizCategoryQuery();

  const categoryOptions = useMemo(
    () =>
      categoryData?.map((c: QuizCategory) => ({
        label: c.name,
        value: c.id,
      })),
    [categoryData]
  );

  /**
   * 🧠 Edit mode — заполняем форму
   */
  useEffect(() => {
    if (!isEdit  || !cards) return;
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

  /**
   * 🚀 Submit
   */
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
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="p-10 w-[60%] mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        {isEdit ? "Edit cards" : "Create cards"}
      </h1>

      <Form<CardsCreatePayload>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
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
        {/* Title */}
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>

        {/* Description */}
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} size="large" />
        </Form.Item>

        {/* Categories */}
        <Form.Item
          name="categories"
          label="Categories"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            size="large"
            options={categoryOptions}
            loading={isCategoryLoading}
          />
        </Form.Item>

        {/* Tags */}
        <Form.Item name="tags" label="Tags" valuePropName="value">
          <TagsInput />
        </Form.Item>

        <Divider />

        {/* Cards */}
        <Form.List name="cards">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }, idx) => (
                <Card
                  key={key}
                  title={`Card ${idx + 1}`}
                  className="mb-6 rounded-xl shadow-md"
                  extra={
                    fields.length > 1 && (
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className="text-red-500 text-lg"
                      />
                    )
                  }
                >
                  <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                    <Form.Item
                      {...rest}
                      name={[name, "question"]}
                      label="Question"
                      rules={[{ required: true }]}
                    >
                      <Input size="large" />
                    </Form.Item>

                    <Form.Item
                      {...rest}
                      name={[name, "answer"]}
                      label="Answer"
                      rules={[{ required: true }]}
                    >
                      <Input.TextArea rows={3} />
                    </Form.Item>
                  </Space>
                </Card>
              ))}

              <Button
                block
                icon={<PlusOutlined />}
                onClick={() => add({ question: "", answer: "" })}
                className="border-dashed"
              >
                Add card
              </Button>
            </>
          )}
        </Form.List>

        <Divider />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            {isEdit ? "Save changes" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
