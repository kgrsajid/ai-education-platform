import { message } from 'antd';
import {
  useForgotPasswordApiMutation,
  useVerifyCodeApiMutation,
  useResetPasswordApiMutation,
} from '../../../api/auth';

export const useSendCodeMutation = () => {
  const [trigger, result] = useForgotPasswordApiMutation();

  const mutate = async (email: string) => {
    try {
      await trigger({ email }).unwrap();
      message.success('Код подтверждения отправлен на вашу почту');
    } catch {
      message.error('Не удалось отправить код. Проверьте email и попробуйте снова');
      throw new Error('send_failed');
    }
  };

  return { ...result, isPending: result.isLoading, mutate };
};

export const useVerifyCodeMutation = () => {
  const [trigger, result] = useVerifyCodeApiMutation();

  const mutate = async (email: string, code: string) => {
    try {
      const data =  await trigger({ email, code }).unwrap();
      return data.token;
    } catch {
      message.error('Неверный код подтверждения. Попробуйте ещё раз');
      throw new Error('verify_failed');
    }
  };

  return { ...result, isPending: result.isLoading, mutate };
};

export const useResetPasswordMutation = () => {
  const [trigger, result] = useResetPasswordApiMutation();

  const mutate = async (token: string, new_password: string) => {
    try {
      await trigger({ token, new_password }).unwrap();
      message.success('Пароль успешно изменён! Войдите с новым паролем');
    } catch {
      message.error('Не удалось изменить пароль. Попробуйте ещё раз');
      throw new Error('reset_failed');
    }
  };

  return { ...result, isPending: result.isLoading, mutate };
};
