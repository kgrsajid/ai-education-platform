import { message } from 'antd';
import {
  useGetAllQuizApiQuery,
  useGetQuizByIdApiQuery,
  useGetAllUserQuizResultApiQuery,
  useAddQuizViewApiMutation,
  useAddQuizResultApiMutation,
  useCreateQuizApiMutation,
  useUpdateQuizApiMutation,
} from '../../api/quiz';
import { useGetAllQuizCategoriesApiQuery } from '../../api/quiz-category';
import type { QuizPayload, TQuizResultAddPayload, TQuizResultGetPayload, QuizCreatePayload, QuizUpdatePayload } from '../../api/quiz/type';

export const useGetAllQuizQuery = (params: QuizPayload) => {
  return useGetAllQuizApiQuery(params);
};

export const useGetQuizByIdQuery = (id?: string) => {
  return useGetQuizByIdApiQuery(id as string, { skip: !id });
};

export const useGetAllUserQuizResult = (payload: TQuizResultGetPayload) => {
  return useGetAllUserQuizResultApiQuery(payload, { skip: !payload.testId });
};

export const useAddQuizViewMutation = () => {
  const [trigger, result] = useAddQuizViewApiMutation();
  return {
    ...result,
    isPending: result.isLoading,
    mutate: trigger,
    mutateAsync: trigger,
  };
};

export const useAddQuizResultMutation = () => {
  const [trigger, result] = useAddQuizResultApiMutation();
  return {
    ...result,
    isPending: result.isLoading,
    mutate: (payload: TQuizResultAddPayload) => trigger(payload),
    mutateAsync: (payload: TQuizResultAddPayload) => trigger(payload),
  };
};

export const useCreateQuizMutation = () => {
  const [trigger, result] = useCreateQuizApiMutation();
  return {
    ...result,
    isPending: result.isLoading,
    mutate: (payload: QuizCreatePayload) => trigger(payload),
    mutateAsync: (payload: QuizCreatePayload) => trigger(payload),
  };
};

export const useUpdateQuizMutation = () => {
  const [trigger, result] = useUpdateQuizApiMutation();

  const mutate = async (payload: QuizUpdatePayload) => {
    await trigger(payload).unwrap();
    message.success('Тест успешно обновлено');
  };

  return {
    ...result,
    isPending: result.isLoading,
    mutate,
    mutateAsync: mutate,
  };
};

export const useGetQuizCategoryQuery = () => {
  return useGetAllQuizCategoriesApiQuery();
};
