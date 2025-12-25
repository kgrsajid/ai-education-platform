import { baseApi } from ".."
import type { TQUizCategoryResponse } from "./type";

export const QuizCategoryApi = {
  getAll: async(): Promise<TQUizCategoryResponse['categories']> => {
    const {data} = await baseApi.get<TQUizCategoryResponse>("/test/category");
    return data.categories;
  }
}