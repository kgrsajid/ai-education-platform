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
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useCreateQuizMutation, useGetQuizCategoryQuery } from "../../../features/query/quiz";
import { useMemo } from "react";
import { TagsInput } from "../../../features/quiz/tags-input";
import type { QuizCreatePayload } from "../../../features/api/quiz/type";
import { useNavigate } from "react-router-dom";


export const QuizCreatePage = () => {
  const [form] = Form.useForm<QuizCreatePayload>();
  const navigate = useNavigate();
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
        Создание викторины
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
          label="Название викторины"
          rules={[{ required: true, message: "Введите название викторины" }]}
        >
          <Input
            size="large"
            placeholder="Введите название викторины"
            className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>
        {/* Описание викторины */}
        <Form.Item
          name="description"
          label="Описание викторины"
        >
          <Input.TextArea
            rows={4}
            placeholder="Введите описание викторины"
            size="large"
            className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>


        {/* Категории */}
        <Form.Item name="categories" label="Категории">
          <Select
            mode="multiple"
            placeholder="Выберите категории"
            size="large"
            className="rounded-lg"
            options={categoryOptions}
            loading={isCategoryLoading}
          >
          </Select>
        </Form.Item>

        {/* Теги */}
        <Form.Item
          label="Теги"
          name="tags"
          valuePropName="value"
        >
          <TagsInput />
        </Form.Item>



        {/* Сложность */}
        <Form.Item name="difficulty" label="Сложность">
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio.Button value="easy">Easy</Radio.Button>
            <Radio.Button value="medium">Medium</Radio.Button>
            <Radio.Button value="hard">Hard</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Divider />

        {/* Вопросы */}
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, idx) => (
                <Card
                  key={key}
                  title={`Вопрос ${idx + 1}`}
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
                        rules={[{ required: true, message: "Введите текст вопроса" }]}
                        className="flex-1"
                      >
                        <Input
                          placeholder="Текст вопроса"
                          size="large"
                          className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, "time"]}>
                        <InputNumber
                          min={10}
                          className="rounded-lg w-28"
                          addonAfter="сек"
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
                                rules={[{ required: true, message: "Введите вариант" }]}
                                className="flex-1 mb-0"
                              >
                                <Input placeholder={`Вариант ${oIdx + 1}`} className="rounded-lg" />
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
                Добавить ещё вопрос
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
            Создать викторину
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
