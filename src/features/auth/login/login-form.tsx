import { Button, Card, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../query/auth/login";
import type { LoginPayload } from "../../api/auth/type";

export const LoginForm = () => {
  const login = useLoginMutation();

  const onFinish = (values: LoginPayload) => {
    login.mutate(values);
  };

  return (
    <Card className="py-10" style={{ width: 500 }}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Вход
      </Typography.Title>
      <Form layout="vertical" onFinish={onFinish}>
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

        <Button type="primary" htmlType="submit" block>
          Войти
        </Button>
      </Form>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </div>
    </Card>
  );
};
