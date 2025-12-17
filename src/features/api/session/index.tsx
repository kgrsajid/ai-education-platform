import { baseApi } from ".."
import type { ChatResponse, SessionResponse } from "./type";

export const sessionApi = {
  getAll: async (): Promise<SessionResponse> => {
      const { data } = await baseApi.get<SessionResponse>(
        '/session',
      );
      return data;
    },
  getSessionById: async (sessionId: string): Promise<ChatResponse> => {
    const {data} = await baseApi.get<ChatResponse>(
      `/session/${sessionId}`
    );
    return data;
  }
}
