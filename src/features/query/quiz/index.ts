import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { QuizPayload, TQuizResultAddPayload, TQuizResultGetPayload } from "../../api/quiz/type";
import { quizApi } from "../../api/quiz";

export const useGetAllQuizQuery = (params: QuizPayload) => {
  return useQuery({
    queryKey: ["quiz", params],
    queryFn: () => quizApi.getAll(params),
  });
}

export const useGetQuizByIdQuery = (id?: string) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => quizApi.getById(id),
    enabled: !!id,
  })
}

export const useGetAllUserQuizResult = (payload: TQuizResultGetPayload) => {
  return useQuery({
    queryKey: ["quiz", payload.testId, payload.duration],
    queryFn: () => quizApi.getAllUserResult(payload),
    enabled: !!payload.testId
  })
}

export const useAddQuizResultMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TQuizResultAddPayload) => quizApi.addResult(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
    }
  })
}