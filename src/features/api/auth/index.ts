import { baseApi } from '..';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  ForgotPasswordPayload,
  VerifyCodePayload,
  ResetPasswordPayload,
} from './type';

const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (payload) => ({
        url: '/auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    register: builder.mutation<RegisterPayload, RegisterPayload>({
      query: (payload) => ({
        url: '/auth/register',
        method: 'POST',
        body: payload,
      }),
    }),
    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordPayload>({
      query: (payload) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: payload,
      }),
    }),
    verifyCode: builder.mutation<{ message: string, token: string }, VerifyCodePayload>({
      query: (payload) => ({
        url: '/auth/verify-code',
        method: 'POST',
        body: payload,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, ResetPasswordPayload>({
      query: (payload) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation: useLoginApiMutation,
  useRegisterMutation: useRegisterApiMutation,
  useForgotPasswordMutation: useForgotPasswordApiMutation,
  useVerifyCodeMutation: useVerifyCodeApiMutation,
  useResetPasswordMutation: useResetPasswordApiMutation,
} = authApiSlice;
