import { baseApi } from '..';
import type { CardPayload, CardResponse, CardsCreatePayload, CardUpdatePayload, TCardDetail } from './type';

const cardApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCards: builder.query<CardResponse['data'], CardPayload>({
      query: (params) => ({ url: '/card', params }),
      transformResponse: (response: CardResponse) => response.data,
      providesTags: ['Card'],
    }),
    getCardById: builder.query<TCardDetail, string>({
      query: (id) => `/card/${id}`,
      transformResponse: (response: { data: TCardDetail }) => response.data,
      providesTags: (_, __, id) => [{ type: 'Card' as const, id }],
    }),
    createCard: builder.mutation<TCardDetail, CardsCreatePayload>({
      query: (payload) => ({
        url: '/card',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: TCardDetail }) => response.data,
      invalidatesTags: ['Card'],
    }),
    updateCard: builder.mutation<TCardDetail, CardUpdatePayload>({
      query: ({ cardId, card }) => ({
        url: `/card/${cardId}`,
        method: 'PUT',
        body: card,
      }),
      transformResponse: (response: { data: TCardDetail }) => response.data,
      invalidatesTags: ['Card'],
    }),
  }),
});

export const {
  useGetAllCardsQuery: useGetAllCardsApiQuery,
  useGetCardByIdQuery: useGetCardByIdApiQuery,
  useCreateCardMutation: useCreateCardApiMutation,
  useUpdateCardMutation: useUpdateCardApiMutation,
} = cardApiSlice;
