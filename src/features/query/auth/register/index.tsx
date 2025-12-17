import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../../api/auth";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import type { RegisterPayload } from "../../../api/auth/type";
import { ROUTES } from "../../../../app/router/config";

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerApi.register(payload),
    onSuccess: (data) => {
      console.log(data);
      message.success("Вы успешно зарегистрировались, теперь войдите в аккаунт");
      navigate(ROUTES.Login); 
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
