import { baseApi } from ".."
import type { ChatResponse, SessionResponse, TSession } from "./type";

export const sessionApi = {
  create: async (): Promise<TSession> => {
    const {data} = await baseApi.post<{data: TSession}>(
      `/session`,
    );
    return data.data;
  },
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
