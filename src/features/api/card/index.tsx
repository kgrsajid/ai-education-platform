import { baseApi } from ".."
import type { CardPayload, CardResponse, CardsCreatePayload, CardUpdatePayload, TCardDetail } from "./type"

export const cardApi = {
  getAll: async(params:CardPayload): Promise<CardResponse["data"]> => {
    const {data} = await baseApi.get<CardResponse>("/card", {
      params: params
    });
    return data.data;
  },
  getById: async(id?: string): Promise<TCardDetail> => {
    const {data} = await baseApi.get<{data: TCardDetail}>(`/card/${id}`);
    return data.data;
  },
  create: async(payload: CardsCreatePayload): Promise<TCardDetail> => {
    const {data} = await baseApi.post<{data: TCardDetail}>(`/card`, payload);
    return data.data;
  },
  update: async(payload: CardUpdatePayload): Promise<TCardDetail> => {
    const {data} = await baseApi.put<{data: TCardDetail}>(`/card/${payload.cardId}`, payload.card);
    return data.data;
  },
}