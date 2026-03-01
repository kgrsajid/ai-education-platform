import { baseApi } from '..';
import type { ChatResponse, SessionResponse, TSession } from './type';

const sessionApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSession: builder.mutation<TSession, void>({
      query: () => ({
        url: '/session',
        method: 'POST',
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
  }),
});

export const {
  useCreateSessionMutation: useCreateSessionApiMutation,
  useGetAllSessionsQuery: useGetAllSessionsApiQuery,
  useGetSessionByIdQuery: useGetSessionByIdApiQuery,
} = sessionApiSlice;
