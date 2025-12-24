import { useQuery } from "@tanstack/react-query"
import type { QuizPayload } from "../../api/quiz/type";
import { quizApi } from "../../api/quiz";

export const useGetAllQuizQuery = (params: QuizPayload) => {
  return useQuery({
    queryKey: ["quiz-get-all", params],
    queryFn: () => quizApi.getAll(params),
  });
}