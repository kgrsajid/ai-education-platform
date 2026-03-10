import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://45.63.69.91:8082/';

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: typeof rawBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    localStorage.removeItem('token');
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Quiz', 'Card', 'Session', 'QuizCategory'],
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});
