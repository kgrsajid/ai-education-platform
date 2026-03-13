import { useState } from 'react';
import { Button, Form, Input, Steps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  useSendCodeMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} from '../../query/auth/forgot-password';
import { ROUTES } from '../../../app/router/config';
import { useTranslation } from 'react-i18next';

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

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState("");
  const sendCode = useSendCodeMutation();
  const verifyCode = useVerifyCodeMutation();
  const resetPassword = useResetPasswordMutation();

  const stepTitles = [
    t('auth.forgotPassword.step0Title'),
    t('auth.forgotPassword.step1Title'),
    t('auth.forgotPassword.step2Title'),
  ];

  const stepDescriptions = [
    t('auth.forgotPassword.step0Desc'),
    '',
    t('auth.forgotPassword.step2Desc'),
  ];

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
    ? t('auth.forgotPassword.step1Desc', { email })
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
              { title: t('auth.forgotPassword.emailStepTitle') },
              { title: t('auth.forgotPassword.codeStepTitle') },
              { title: t('auth.forgotPassword.passwordStepTitle') },
            ]}
          />

          {/* Step 0: Enter email */}
          {step === 0 && (
            <Form layout="vertical" onFinish={onSendEmail} requiredMark={false}>
              <Form.Item
                name="email"
                label={t('auth.forgotPassword.emailLabel')}
                rules={[{ required: true, type: 'email', message: t('auth.forgotPassword.emailError') }]}
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
                  {t('auth.forgotPassword.sendCode')}
                </Button>
              </Form.Item>
            </Form>
          )}

          {/* Step 1: Enter OTP code */}
          {step === 1 && (
            <Form layout="vertical" onFinish={onVerifyCode} requiredMark={false}>
              <Form.Item
                name="code"
                label={t('auth.forgotPassword.codeLabel')}
                rules={[
                  { required: true, message: t('auth.forgotPassword.codeRequired') },
                  { len: 6, message: t('auth.forgotPassword.codeLength') },
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
                  {t('auth.forgotPassword.confirmCode')}
                </Button>
              </Form.Item>

              <Button
                type="text"
                block
                size="large"
                style={{ marginTop: 8, color: '#94a3b8' }}
                onClick={() => setStep(0)}
              >
                {t('auth.forgotPassword.changeEmail')}
              </Button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-sm text-slate-500 hover:text-[#1152d4] transition-colors"
                  onClick={() => sendCode.mutate(email)}
                  disabled={sendCode.isPending}
                >
                  {t('auth.forgotPassword.resendCode')}
                </button>
              </div>
            </Form>
          )}

          {/* Step 2: Enter new password */}
          {step === 2 && (
            <Form layout="vertical" onFinish={onResetPassword} requiredMark={false}>
              <Form.Item
                name="password"
                label={t('auth.forgotPassword.newPasswordLabel')}
                rules={[{ required: true, min: 6, message: t('auth.forgotPassword.newPasswordError') }]}
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
                label={t('auth.forgotPassword.confirmPasswordLabel')}
                dependencies={['password']}
                rules={[
                  { required: true, message: t('auth.forgotPassword.confirmPasswordRequired') },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t('auth.forgotPassword.passwordsMismatch')));
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
                  {t('auth.forgotPassword.saveNewPassword')}
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>

        <div className="bg-slate-800/40 p-6 text-center border-t border-slate-800">
          <p className="text-sm text-slate-400 font-medium m-0">
            {t('auth.forgotPassword.rememberPassword')}{' '}
            <Link to={ROUTES.Login} className="text-[#1152d4] font-bold hover:underline">
              {t('auth.forgotPassword.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
