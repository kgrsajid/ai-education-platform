import { Button, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../query/auth/register";
import type { RegisterPayload } from "../../api/auth/type";

const PersonIcon = () => (
  <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '1.1rem', lineHeight: 1 }}>
    person
  </span>
);

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

export const RegisterForm = () => {
  const register = useRegisterMutation();

  return (
    <div className="w-full max-w-[480px] z-10">
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-8 pb-6">
          <div className="flex flex-col items-center text-center gap-2 mb-8">
            <div className="size-16 bg-[#1152d4]/10 rounded-2xl flex items-center justify-center text-[#1152d4] mb-2">
              <span className="material-symbols-outlined" style={{ fontSize: '2.5rem' }}>person_add</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white m-0">Создать аккаунт</h1>
            <p className="text-slate-400 text-sm m-0">Начни учиться умнее с AI Learn</p>
          </div>

          <Form<RegisterPayload>
            layout="vertical"
            onFinish={register.mutate}
            requiredMark={false}
          >
            <Form.Item
              name="name"
              label="Имя"
              rules={[{ required: true, message: 'Введите имя' }]}
            >
              <Input
                prefix={<PersonIcon />}
                placeholder="Иван Иванов"
                size="large"
                autoComplete="name"
              />
            </Form.Item>

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

            <Form.Item
              name="password"
              label="Пароль"
              rules={[{ required: true, min: 6, message: 'Минимум 6 символов' }]}
            >
              <Input.Password
                prefix={<LockIcon />}
                placeholder="••••••••"
                size="large"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item
              name="role"
              label="Роль"
              rules={[{ required: true, message: 'Выберите роль' }]}
            >
              <Select
                placeholder="Выберите роль"
                size="large"
                options={[
                  { value: 'student', label: 'Студент' },
                  { value: 'teacher', label: 'Учитель' },
                  { value: 'admin', label: 'Админ' },
                ]}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={register.isPending}
              >
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="bg-slate-800/40 p-6 text-center border-t border-slate-800">
          <p className="text-sm text-slate-400 font-medium m-0">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-[#1152d4] font-bold hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
