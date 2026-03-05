import { useState } from 'react';
import { Button, Form, Input, Steps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  useSendCodeMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} from '../../query/auth/forgot-password';
import { ROUTES } from '../../../app/router/config';

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

const stepIcons = ['lock_reset', 'mark_email_read', 'lock_open'];
const stepTitles = ['Восстановление пароля', 'Введите код', 'Новый пароль'];
const stepDescriptions = [
  'Введите email для получения кода',
  '',
  'Придумайте надёжный пароль',
];

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState("");
  const sendCode = useSendCodeMutation();
  const verifyCode = useVerifyCodeMutation();
  const resetPassword = useResetPasswordMutation();

  const onSendEmail = async (values: { email: string }) => {
    try {
      await sendCode.mutate(values.email);
      setEmail(values.email);
      setStep(1);
    } catch {
      // error handled inside hook
    }
  };

  const onVerifyCode = async (values: { code: string }) => {
    try {
      const token = await verifyCode.mutate(email, values.code);
      setToken(token);
      setStep(2);
    } catch {
      // error handled inside hook
    }
  };

  const onResetPassword = async (values: { password: string }) => {
    try {
      await resetPassword.mutate(token, values.password);
      navigate(ROUTES.Login);
    } catch {
      // error handled inside hook
    }
  };

  const description = step === 1
    ? `Код отправлен на ${email}`
    : stepDescriptions[step];

  return (
    <div className="w-full max-w-[480px] z-10">
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-8 pb-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-2 mb-8">
            <div className="size-16 bg-[#1152d4]/10 rounded-2xl flex items-center justify-center text-[#1152d4] mb-2">
              <span className="material-symbols-outlined" style={{ fontSize: '2.5rem' }}>
                {stepIcons[step]}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white m-0">
              {stepTitles[step]}
            </h1>
            <p className="text-slate-400 text-sm m-0">{description}</p>
          </div>

          {/* Steps indicator */}
          <Steps
            current={step}
            size="small"
            className="mb-8"
            items={[
              { title: 'Email' },
              { title: 'Код' },
              { title: 'Пароль' },
            ]}
          />

          {/* Step 0: Enter email */}
          {step === 0 && (
            <Form layout="vertical" onFinish={onSendEmail} requiredMark={false}>
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
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={sendCode.isPending}
                >
                  Отправить код
                </Button>
              </Form.Item>
            </Form>
          )}

          {/* Step 1: Enter OTP code */}
          {step === 1 && (
            <Form layout="vertical" onFinish={onVerifyCode} requiredMark={false}>
              <Form.Item
                name="code"
                label="Код подтверждения"
                rules={[
                  { required: true, message: 'Введите код' },
                  { len: 6, message: 'Код должен содержать 6 цифр' },
                ]}
              >
                <Input.OTP length={6} size="large" />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={verifyCode.isPending}
                >
                  Подтвердить код
                </Button>
              </Form.Item>

              <Button
                type="text"
                block
                size="large"
                style={{ marginTop: 8, color: '#94a3b8' }}
                onClick={() => setStep(0)}
              >
                Изменить email
              </Button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-sm text-slate-500 hover:text-[#1152d4] transition-colors"
                  onClick={() => sendCode.mutate(email)}
                  disabled={sendCode.isPending}
                >
                  Отправить код повторно
                </button>
              </div>
            </Form>
          )}

          {/* Step 2: Enter new password */}
          {step === 2 && (
            <Form layout="vertical" onFinish={onResetPassword} requiredMark={false}>
              <Form.Item
                name="password"
                label="Новый пароль"
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
                name="confirm"
                label="Подтвердите пароль"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Подтвердите пароль' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Пароли не совпадают'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockIcon />}
                  placeholder="••••••••"
                  size="large"
                  autoComplete="new-password"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={resetPassword.isPending}
                >
                  Сохранить новый пароль
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>

        <div className="bg-slate-800/40 p-6 text-center border-t border-slate-800">
          <p className="text-sm text-slate-400 font-medium m-0">
            Вспомнили пароль?{' '}
            <Link to={ROUTES.Login} className="text-[#1152d4] font-bold hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
