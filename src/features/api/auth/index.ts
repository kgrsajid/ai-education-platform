import { baseApi } from "..";
import type { LoginPayload, LoginResponse, RegisterPayload } from "./type";

export const loginApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await baseApi.post<LoginResponse>(
      '/auth/login',
      payload
    );
    return data;
  },
};

export const registerApi = {
  register: async (payload: RegisterPayload): Promise<RegisterPayload> => {
    const {data} = await baseApi.post<RegisterPayload>(
      '/auth/register',
      payload
    );
    return data;
  }
}
