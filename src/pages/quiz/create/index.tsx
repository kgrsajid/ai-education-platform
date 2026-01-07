import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  Card,
  Space,
  Checkbox,
  InputNumber,
  Divider,
  Switch,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  useCreateQuizMutation,
  useGetQuizByIdQuery,
  useGetQuizCategoryQuery,
  useUpdateQuizMutation,
} from "../../../features/query/quiz";
import { useEffect, useMemo, type FC } from "react";
import { TagsInput } from "../../../features/quiz/tags-input";
import type { QuizCreatePayload, TOption, TQuestion } from "../../../features/api/quiz/type";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { QuizCategory } from "../../../features/api/quiz-category/type";

type Props = {
  isEdit?: boolean;
};

export const QuizCreatePage: FC<Props> = ({ isEdit = false }) => {
  const [form] = Form.useForm<QuizCreatePayload>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

  const quizId = state?.quizId;

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetQuizCategoryQuery();

  const { data: quiz, isLoading: isQuizLoading } = useGetQuizByIdQuery(
    quizId,
  );

  const createQuizMutation = useCreateQuizMutation();
  const updateQuizMutation = useUpdateQuizMutation();

  const categoryOptions = useMemo(
    () => categoryData?.map((c) => ({ label: c.name, value: c.id })),
    [categoryData]
  );

  useEffect(() => {
    if (!quiz || !isEdit) return;
    form.setFieldsValue({
      title: quiz.title,
      description: quiz.description,
      difficulty: quiz.difficulty,
      isPrivate: quiz.isPrivate,
      tags: quiz.tags ?? [],
      categories: quiz.categories?.map((c: QuizCategory) => c.id) ?? [],
      questions: quiz.questions.map((q: TQuestion) => ({
        question: q.question,
        options: q.options.map((o: TOption) => ({
          optionText: o.optionText,
          isCorrect: o.isCorrect,
        })),
      })),
    });
  }, [quiz, isEdit, form]);

  const onFinish = (values: QuizCreatePayload) => {
    if (isEdit) {
      updateQuizMutation.mutate({ quizId: quizId, quiz: values });
    } else {
      createQuizMutation.mutate(values);
    }
    if(isEdit) {
      navigate(`/quiz/${quizId}`);
    }else {
      navigate('/quiz');
    }

  };

  if (isEdit && isQuizLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="p-10 w-[60%] mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        {isEdit
          ? t("quiz.phrases.editPage.title")
          : t("quiz.phrases.createPage.title")}
      </h1>

      <Form<QuizCreatePayload>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={
          isEdit
            ? undefined
            : {
                difficulty: "easy",
                isPrivate: false,
                questions: [
                  {
                    title: "",
                    time: 90,
                    options: Array(4).fill({
                      optionText: "",
                      isCorrect: false,
                    }),
                  },
                ],
              }
        }
      >
        {/* Название */}
        <Form.Item
          name="title"
          label={t("quiz.phrases.createPage.form.name.label")}
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>

        {/* Описание */}
        <Form.Item name="description">
          <Input.TextArea rows={4} size="large" />
        </Form.Item>

        {/* Категории */}
        <Form.Item name="categories" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            size="large"
            options={categoryOptions}
            loading={isCategoryLoading}
          />
        </Form.Item>

        {/* Теги */}
        <Form.Item name="tags" valuePropName="value">
          <TagsInput />
        </Form.Item>

        {/* Сложность */}
        <Form.Item name="difficulty">
          <Radio.Group optionType="button">
            <Radio.Button value="easy">Easy</Radio.Button>
            <Radio.Button value="medium">Medium</Radio.Button>
            <Radio.Button value="hard">Hard</Radio.Button>
          </Radio.Group>
        </Form.Item>


        <Form.Item
          name="isPrivate"
          label={t("quiz.phrases.createPage.form.isPrivate.label")}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Divider />

        {/* Вопросы */}
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, idx) => (
                <Card
                  key={key}
                  title={`${t("quiz.words.createPage.question")} ${idx + 1}`}
                  bordered
                  hoverable
                  className="mb-6 rounded-xl shadow-lg transition-transform transform hover:scale-[1.01]"
                  extra={
                    fields.length > 1 && (
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className="text-red-500 text-lg"
                      />
                    )
                  }
                >
                  <Space direction="vertical" style={{ width: "100%" }} size="middle">
                    {/* Заголовок и время */}
                    <div className="flex gap-4">
                      <Form.Item
                        {...restField}
                        name={[name, "question"]}
                        rules={[{ required: true, message: t("quiz.phrases.createPage.form.question.message") }]}
                        className="flex-1"
                      >
                        <Input
                          placeholder={t("quiz.phrases.createPage.form.question.placeholder")}
                          size="large"
                          className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, "time"]}>
                        <InputNumber
                          min={10}
                          className="rounded-lg w-28"
                          addonAfter={t("quiz.words.createPage.second")}
                        />
                      </Form.Item>
                    </div>

                    {/* Варианты */}
                    <Form.List name={[name, "options"]}>
                      {(optionFields) => (
                        <div className="grid grid-cols-2 gap-4">
                          {optionFields.map(({ key: oKey, name: oName, ...oRest }, oIdx) => (
                            <div
                              key={oKey}
                              className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg shadow-sm"
                            >
                              <Form.Item
                                {...oRest}
                                name={[oName, "isCorrect"]}
                                valuePropName="checked"
                                className="mb-0"
                              >
                                <Checkbox />
                              </Form.Item>
                              <Form.Item
                                {...oRest}
                                name={[oName, "optionText"]}
                                rules={[{ required: true, message: t("quiz.phrases.createPage.form.variant.message") }]}
                                className="flex-1 mb-0"
                              >
                                <Input placeholder={`${t("quiz.words.createPage.variant")} ${oIdx + 1}`} className="rounded-lg" />
                              </Form.Item>
                            </div>
                          ))}
                        </div>
                      )}
                    </Form.List>
                  </Space>
                </Card>
              ))}

              <Button
                onClick={() =>
                  add({
                    title: "",
                    time: 90,
                    options: Array(4).fill({
                      optionText: "",
                      isCorrect: false,
                    }),
                  })
                }
                block
                icon={<PlusOutlined />}
                className="rounded-lg border-dashed border-gray-300 mt-2"
              >
                Add question
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
            { !isEdit ? t("quiz.phrases.createPage.form.createText") :  t("quiz.phrases.editPage.editText") }
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
