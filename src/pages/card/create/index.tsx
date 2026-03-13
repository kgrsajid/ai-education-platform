import {
  Form,
  Input,
  Button,
  Select,
  Modal,
  InputNumber,
  message,
  Switch,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { TagsInput } from "../../../features/quiz/tags-input";
import { useGetQuizCategoryQuery } from "../../../features/query/quiz";
import type { QuizCategory } from "../../../features/api/quiz-category/type";
import type { CardsCreatePayload } from "../../../features/api/card/type";
import {
  useCreateCardMutation,
  useGenerateCardsMutation,
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
  const { t } = useTranslation();
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [numCards, setNumCards] = useState(5);
  const cardsId = state?.cardId;

  const { data: cards, isLoading } = useGetCardByIdQuery(cardsId);
  const createMutation = useCreateCardMutation();
  const updateMutation = useUpdateCardMutation();
  const generateMutation = useGenerateCardsMutation();

  const titleValue = Form.useWatch('title', form);
  const categoriesValue = Form.useWatch('categories', form);
  const isGenerateEnabled = !!titleValue && categoriesValue?.length > 0;

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

  const handleGenerate = async () => {
    const values = form.getFieldsValue();
    try {
      const result = await generateMutation.mutateAsync({
        title: values.title,
        context: values.description || '',
        categories: (values.categories ?? []).map(Number),
        is_private: values.isPrivate ?? false,
        num_cards: numCards,
      });
      form.setFieldValue('cards', result.cards.map((c) => ({
        question: c.question,
        answer: c.answer,
      })));
      message.success(`Generated ${result.cards.length} cards!`);
      setGenerateModalOpen(false);
    } catch {
      message.error('Failed to generate cards. Please try again.');
    }
  };

  const onFinish = (values: CardsCreatePayload) => {
    const payload: CardsCreatePayload = {
      title: values.title,
      description: values.description || undefined,
      tags: values.tags ?? [],
      categories: values.categories,
      cards: values.cards,
      isPrivate: values.isPrivate
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
        <span className="text-slate-400">{t('common.loading')}</span>
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
            {t('card.phrases.createPage.flashcards')}
          </span>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">
              {isEdit ? t('card.phrases.createPage.editTitle') : t('card.phrases.createPage.createTitle')}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {isEdit
                ? t('card.phrases.createPage.editSubtitle')
                : t('card.phrases.createPage.createSubtitle')}
            </p>
          </div>
          {!isEdit && (
            <button
              type="button"
              disabled={!isGenerateEnabled}
              onClick={() => setGenerateModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#1152d4]/50 font-semibold text-[#1152d4] hover:bg-[#1152d4]/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              {t('common.generateWithAI')}
            </button>
          )}
        </div>
      </div>

      <Modal
        title="Generate Cards with AI"
        open={generateModalOpen}
        onCancel={() => setGenerateModalOpen(false)}
        onOk={handleGenerate}
        okText="Generate"
        confirmLoading={generateMutation.isPending}
        okButtonProps={{ disabled: generateMutation.isPending }}
      >
        <div className="py-4 flex flex-col gap-4">
          <p className="text-sm text-slate-500">
            AI will generate flashcards based on your title and description.
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Number of cards</label>
            <InputNumber
              min={1}
              max={50}
              value={numCards}
              onChange={(v) => setNumCards(v ?? 5)}
              className="w-full"
              size="large"
            />
          </div>
        </div>
      </Modal>

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
            {t('card.phrases.createPage.generalInfo')}
          </h2>

          <Form.Item
            name="title"
            label={<span className="text-slate-300 text-sm font-medium">{t('card.phrases.createPage.title')}</span>}
            rules={[{ required: true, message: t('card.phrases.createPage.titleRequired') }]}
          >
            <Input
              size="large"
              placeholder={t('card.phrases.createPage.titlePlaceholder')}
              style={{
                background: "rgb(15 23 42 / 0.6)",
                borderColor: "rgb(51 65 85)",
                color: "#e2e8f0",
              }}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="text-slate-300 text-sm font-medium">{t('card.phrases.createPage.description')}</span>}
          >
            <Input.TextArea
              rows={3}
              placeholder={t('card.phrases.createPage.descriptionPlaceholder')}
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
              label={<span className="text-slate-300 text-sm font-medium">{t('card.phrases.createPage.categories')}</span>}
              rules={[{ required: true, message: t('card.phrases.createPage.categoriesRequired') }]}
            >
              <Select
                mode="multiple"
                size="large"
                options={categoryOptions}
                loading={isCategoryLoading}
                placeholder={t('card.phrases.createPage.selectCategories')}
                style={{ background: "rgb(15 23 42 / 0.6)" }}
              />
            </Form.Item>

            <Form.Item
              name="tags"
              label={<span className="text-slate-300 text-sm font-medium">{t('card.phrases.createPage.tags')}</span>}
              valuePropName="value"
            >
              <TagsInput />
            </Form.Item>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-white font-semibold">{t('card.phrases.createPage.privateMode')}</span>
                <p className="text-xs text-slate-400">
                  {t('card.phrases.createPage.privateModeDesc')}
                </p>
              </div>
              <Form.Item name="isPrivate" valuePropName="checked" className="!mb-0">
                <Switch />
              </Form.Item>
            </div>
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
                      <span className="text-slate-300 text-sm font-semibold">
                        {t('card.phrases.createPage.cardLabel', { n: idx + 1 })}
                      </span>
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
                          {t('card.phrases.createPage.question')}
                        </span>
                      }
                      rules={[{ required: true, message: t('common.required') }]}
                    >
                      <Input
                        size="large"
                        placeholder={t('card.phrases.createPage.enterQuestion')}
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
                          {t('card.phrases.createPage.answer')}
                        </span>
                      }
                      rules={[{ required: true, message: t('common.required') }]}
                    >
                      <Input.TextArea
                        rows={2}
                        placeholder={t('card.phrases.createPage.enterAnswer')}
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
                {t('card.phrases.createPage.addAnotherCard')}
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
            {t('common.cancel')}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ background: "#1152d4", borderColor: "#1152d4" }}
            className="font-semibold px-8"
          >
            {isEdit ? t('card.phrases.createPage.saveChanges') : t('card.phrases.createPage.createSetBtn')}
          </Button>
        </div>
      </Form>
    </div>
  );
};
