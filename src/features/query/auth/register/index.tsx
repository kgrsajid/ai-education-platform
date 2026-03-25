import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useRegisterApiMutation } from '../../../api/auth';
import { ROUTES } from '../../../../app/router/config';
import type { RegisterPayload } from '../../../api/auth/type';

export const useRegisterMutation = () => {
  const [registerTrigger, result] = useRegisterApiMutation();
  const navigate = useNavigate();

  const mutate = async (payload: RegisterPayload) => {
    try {
      await registerTrigger(payload).unwrap();
      message.success('Вы успешно зарегистрировались, теперь войдите в аккаунт');
      navigate(ROUTES.Login);
    } catch (err: any) {
      const msg = err?.data?.error || 'Registration failed. Please try again.';
      message.error(msg);
    }
  };

  return {
    ...result,
    isPending: result.isLoading,
    mutate,
    mutateAsync: mutate,
  };
};
