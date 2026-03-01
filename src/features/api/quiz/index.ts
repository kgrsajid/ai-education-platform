import { baseApi } from '..';
import type {
  QuizPayload,
  QuizResponse,
  TQuizDetails,
  QuizDetailResponse,
  TQuizResultResponse,
  TQuizResultGetPayload,
  TQuizResultAddPayload,
  QuizCreatePayload,
  QuizUpdatePayload,
} from './type';

const quizApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuiz: builder.query<QuizResponse['data'], QuizPayload>({
      query: (params) => ({ url: '/test', params }),
      transformResponse: (response: QuizResponse) => response.data,
      providesTags: ['Quiz'],
    }),
    getQuizById: builder.query<TQuizDetails, string>({
      query: (id) => `/test/${id}`,
      transformResponse: (response: QuizDetailResponse) => response.test,
      providesTags: (_, __, id) => [{ type: 'Quiz' as const, id }],
    }),
    addQuizResult: builder.mutation<TQuizResultResponse, TQuizResultAddPayload>({
      query: (payload) => ({
        url: '/test/result',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: TQuizResultResponse }) => response.data,
      invalidatesTags: ['Quiz'],
    }),
    getAllUserQuizResult: builder.query<TQuizResultResponse[], TQuizResultGetPayload>({
      query: ({ testId, duration }) => ({
        url: `/test/result/${testId}`,
        params: { duration },
      }),
      transformResponse: (response: { data: TQuizResultResponse[] }) => response.data,
      providesTags: ['Quiz'],
    }),
    addQuizView: builder.mutation<void, string>({
      query: (testId) => ({
        url: 'test/view',
        method: 'POST',
        body: { testId },
      }),
      invalidatesTags: ['Quiz'],
    }),
    createQuiz: builder.mutation<TQuizDetails, QuizCreatePayload>({
      query: (payload) => ({
        url: '/test',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: TQuizDetails }) => response.data,
      invalidatesTags: ['Quiz'],
    }),
    updateQuiz: builder.mutation<TQuizDetails, QuizUpdatePayload>({
      query: ({ quizId, quiz }) => ({
        url: `/test/${quizId}`,
        method: 'PUT',
        body: quiz,
      }),
      transformResponse: (response: { data: TQuizDetails }) => response.data,
      invalidatesTags: ['Quiz'],
    }),
  }),
});

export const {
  useGetAllQuizQuery: useGetAllQuizApiQuery,
  useGetQuizByIdQuery: useGetQuizByIdApiQuery,
  useAddQuizResultMutation: useAddQuizResultApiMutation,
  useGetAllUserQuizResultQuery: useGetAllUserQuizResultApiQuery,
  useAddQuizViewMutation: useAddQuizViewApiMutation,
  useCreateQuizMutation: useCreateQuizApiMutation,
  useUpdateQuizMutation: useUpdateQuizApiMutation,
} = quizApiSlice;
