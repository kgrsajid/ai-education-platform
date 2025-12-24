import { baseApi } from ".."
import { type QuizResponse, type QuizPayload } from "./type";

export const quizApi = {
  getAll: async(params: QuizPayload): Promise<QuizResponse["data"]> => {
    const {data} = await baseApi.get<QuizResponse>("/test", {
      params: params
    });
    return data.data;
  }
}