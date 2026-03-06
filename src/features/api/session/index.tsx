import { baseApi } from '..';
import type { ChatResponse, SessionResponse, TSession } from './type';

const sessionApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSession: builder.mutation<TSession, {message: string}>({
      query: (payload) => ({
        url: '/session',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: TSession }) => response.data,
      invalidatesTags: ['Session'],
    }),
    getAllSessions: builder.query<SessionResponse, void>({
      query: () => '/session',
      providesTags: ['Session'],
    }),
    getSessionById: builder.query<ChatResponse, string>({
      query: (sessionId) => `/session/${sessionId}`,
      providesTags: (_, __, id) => [{ type: 'Session' as const, id }],
    }),
    deleteSessionById: builder.mutation<void, string>({
      query: (sessionId) => ({
        url: `/session/${sessionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Session'],
    }),
  }),
});

export const {
  useCreateSessionMutation: useCreateSessionApiMutation,
  useGetAllSessionsQuery: useGetAllSessionsApiQuery,
  useGetSessionByIdQuery: useGetSessionByIdApiQuery,
  useDeleteSessionByIdMutation: useDeleteSessionByIdApiMutation,
} = sessionApiSlice;
