import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useLoginApiMutation } from '../../../api/auth';
import { useAuth } from '../../../../providers/context/const/const';
import { ROUTES } from '../../../../app/router/config';
import type { LoginPayload } from '../../../api/auth/type';

export const useLoginMutation = () => {
  const [loginTrigger, result] = useLoginApiMutation();
  const navigate = useNavigate();
  const auth = useAuth();

  const mutate = async (payload: LoginPayload) => {
    try {
      const data = await loginTrigger(payload).unwrap();
      navigate(`${ROUTES.Chat}/new`);
      message.success('Вы упешно вошли в свой аккаунт');
      auth.login(data.token, data.user);
    } catch {
      // error is available in result.error
    }
  };

  return {
    ...result,
    isPending: result.isLoading,
    mutate,
    mutateAsync: mutate,
  };
};
