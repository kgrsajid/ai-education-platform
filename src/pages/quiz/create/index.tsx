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
import { useCreateQuizMutation, useGetQuizCategoryQuery } from "../../../features/query/quiz";
import { useMemo } from "react";
import { TagsInput } from "../../../features/quiz/tags-input";
import type { QuizCreatePayload } from "../../../features/api/quiz/type";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


export const QuizCreatePage = () => {
  const [form] = Form.useForm<QuizCreatePayload>();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {data: categoryData, isLoading: isCategoryLoading} = useGetQuizCategoryQuery();
  const createMutation = useCreateQuizMutation();
  const categoryOptions = useMemo(() => {
    return categoryData?.map(val => ({label: val.name, value: val.id}));
  },[categoryData]);
  const onFinish = (values: QuizCreatePayload) => {
    console.log("Форма отправлена:", values);
    createMutation.mutate(values);
    navigate("/quiz");
  };

  return (
    <div className="p-10 w-[60%] mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        {t("quiz.phrases.createPage.title")}
      </h1>

      <Form<QuizCreatePayload>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          difficulty: "easy",
          questions: [
            {
              title: "",
              options: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
              ],
              time: 90,
            },
          ],
        }}
      >
        {/* Заголовок викторины */}
        <Form.Item
          name="title"
          label={t("quiz.phrases.createPage.form.name.label")}
          rules={[{ required: true, message: t("quiz.phrases.createPage.form.name.message") }]}
        >
          <Input
            size="large"
            placeholder={t("quiz.phrases.createPage.form.name.placeholder")}
            className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>
        {/* Описание викторины */}
        <Form.Item
          name="description"
          label={t("quiz.phrases.createPage.form.description.label")}
        >
          <Input.TextArea
            rows={4}
            placeholder={t("quiz.phrases.createPage.form.description.placeholder")}
            size="large"
            className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>


        {/* Категории */}
        <Form.Item 
          name="categories" 
          label={t("quiz.phrases.createPage.form.categories.label")}
          rules={[{required: true, message: t("quiz.phrases.createPage.form.categories.message")}]}
        >
          <Select
            mode="multiple"
            placeholder={t("quiz.phrases.createPage.form.categories.placeholder")}
            size="large"
            className="rounded-lg"
            options={categoryOptions}
            loading={isCategoryLoading}
          >
          </Select>
        </Form.Item>

        {/* Теги */}
        <Form.Item
          label={t("quiz.phrases.createPage.form.tags.label")}
          name="tags"
          valuePropName="value"
        >
          <TagsInput />
        </Form.Item>



        {/* Сложность */}
        <Form.Item name="difficulty" label={t("quiz.words.difficulty")}>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio.Button value="easy">{t("quiz.words.diff.easy")}</Radio.Button>
            <Radio.Button value="medium">{t("quiz.words.diff.medium")}</Radio.Button>
            <Radio.Button value="hard">{t("quiz.words.diff.hard")}</Radio.Button>
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
                        name={[name, "title"]}
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
                type="dashed"
                onClick={() =>
                  add({
                    title: "",
                    options: [
                      { text: "", isCorrect: false },
                      { text: "", isCorrect: false },
                      { text: "", isCorrect: false },
                      { text: "", isCorrect: false },
                    ],
                    time: 90,
                  })
                }
                block
                icon={<PlusOutlined />}
                className="rounded-lg border-dashed border-gray-300 mt-2"
              >
                {t("quiz.phrases.createPage.form.addAnother")}
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
            {t("quiz.phrases.createPage.form.createText")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
