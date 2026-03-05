import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../query/auth/login";
import type { LoginPayload } from "../../api/auth/type";

const MailIcon = () => (
  <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '1.1rem', lineHeight: 1 }}>
    mail
  </span>
);

const LockIcon = () => (
  <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '1.1rem', lineHeight: 1 }}>
    lock
  </span>
);

export const LoginForm = () => {
  const login = useLoginMutation();

  return (
    <div className="w-full max-w-[480px] z-10">
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-8 pb-6">
          <div className="flex flex-col items-center text-center gap-2 mb-8">
            <div className="size-16 bg-[#1152d4]/10 rounded-2xl flex items-center justify-center text-[#1152d4] mb-2">
              <span className="material-symbols-outlined" style={{ fontSize: '2.5rem' }}>account_circle</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white m-0">Добро пожаловать!</h1>
            <p className="text-slate-400 text-sm m-0">Готовы повысить свои знания сегодня?</p>
          </div>
          <Form<LoginPayload>
            layout="vertical"
            onFinish={login.mutate}
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}
            >
              <Input
                prefix={<MailIcon />}
                placeholder="name@university.edu"
                size="large"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-semibold text-slate-300">Пароль</span>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-[#1152d4] hover:underline"
                  tabIndex={-1}
                >
                  Забыли пароль?
                </Link>
              </div>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, min: 6, message: 'Минимум 6 символов' }]}
            >
              <Input.Password
                prefix={<LockIcon />}
                placeholder="••••••••"
                size="large"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={login.isPending}
              >
                Войти в систему
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="bg-slate-800/40 p-6 text-center border-t border-slate-800">
          <p className="text-sm text-slate-400 font-medium m-0">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-[#1152d4] font-bold hover:underline">
              Создать аккаунт
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
