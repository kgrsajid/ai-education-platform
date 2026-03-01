import { baseApi } from '..';
import type { QuizCategory, TQUizCategoryResponse } from './type';

const quizCategoryApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizCategories: builder.query<QuizCategory[], void>({
      query: () => '/test/category',
      transformResponse: (response: TQUizCategoryResponse) => response.categories,
      providesTags: ['QuizCategory'],
    }),
  }),
});

export const {
  useGetAllQuizCategoriesQuery: useGetAllQuizCategoriesApiQuery,
} = quizCategoryApiSlice;
