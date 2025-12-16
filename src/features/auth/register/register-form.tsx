import { Button, Card, Form, Input, Select, Typography } from "antd";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../query/auth/register";
import type { RegisterPayload } from "../../api/auth/type";

const { Option } = Select;

export const RegisterForm = () => {
  const register = useRegisterMutation();

  const onFinish = (values: RegisterPayload) => {
    register.mutate(values);
  };

  return (
    <Card className="py-10" style={{ width: 500 }}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Регистрация
      </Typography.Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input placeholder="Иван Иванов" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Введите корректный email" }]}
        >
          <Input placeholder="example@mail.com" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, min: 6, message: "Минимум 6 символов" }]}
        >
          <Input.Password placeholder="••••••" />
        </Form.Item>

        <Form.Item
          label="Роль"
          name="role"
          rules={[{ required: true, message: "Выберите роль" }]}
        >
          <Select placeholder="Выберите роль">
            <Option value="teacher">Учитель</Option>
            <Option value="student">Студент</Option>
            <Option value="admin">Админ</Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Зарегистрироваться
        </Button>
      </Form>

      <div style={{ marginTop: 16, textAlign: "center" }}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </div>
    </Card>
  );
};
