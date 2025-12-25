// features/auth/login/model/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../providers/context/const/const';
import { message } from 'antd';
import { ROUTES } from '../../../../app/router/config';

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  return useMutation({
    mutationFn: loginApi.login,
    onSuccess: (data) => {
      navigate(`${ROUTES.Chat}/new`);
      message.success("Вы упешно вошли в свой аккаунт");
      auth.login(data.token);
    },
  });
};
