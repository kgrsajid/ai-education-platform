import { baseApi } from ".."
import type { ChatResponse } from "../session/type";
import type { ChatCreatePayload, ChatPayload } from "./type";

export const chatApi = {
  addMessage: async(value: ChatPayload): Promise<ChatResponse> => {
    const {data} = await baseApi.post("/chat", value);
    return data;
  },
  addMessageAndCreateSession: async(value: ChatCreatePayload): Promise<ChatResponse> => {
    const {data} = await baseApi.post("/chat/new", value);
    return data;
  }
}