import { baseApi } from ".."
import { type QuizResponse, type QuizPayload, type TQuizDetails, type QuizDetailResponse, type TQuizResultResponse, type TQuizResultGetPayload, type TQuizResultAddPayload } from "./type";

export const quizApi = {
  getAll: async(params: QuizPayload): Promise<QuizResponse["data"]> => {
    const {data} = await baseApi.get<QuizResponse>("/test", {
      params: params
    });
    return data.data;
  },
  getById: async(id?: string): Promise<TQuizDetails> => {
    const {data} = await baseApi.get<QuizDetailResponse>(`/test/${id}`);
    return data.test;
  },
  addResult: async(payload: TQuizResultAddPayload): Promise<TQuizResultResponse> => {
    const {data} = await baseApi.post<{data: TQuizResultResponse}>("/test/result", payload);
    return data.data;
  },
  getAllUserResult: async(payload: TQuizResultGetPayload): Promise<TQuizResultResponse[]> => {
    const {data} = await baseApi.get<{data: TQuizResultResponse[]}>(`/test/result/${payload.testId}`, {
      params: {
        duration: payload.duration
      }
    });
    return data.data;
  }
}