import { baseApi } from '..';
import type { LoginPayload, LoginResponse, RegisterPayload } from './type';

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
  }),
});

export const {
  useLoginMutation: useLoginApiMutation,
  useRegisterMutation: useRegisterApiMutation,
} = authApiSlice;
