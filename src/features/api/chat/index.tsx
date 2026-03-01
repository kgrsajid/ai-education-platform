import { baseApi } from '..';
import type { ChatResponse } from '../session/type';
import type { ChatCreatePayload, ChatPayload } from './type';

const chatApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation<ChatResponse, ChatPayload>({
      query: (payload) => ({
        url: '/chat',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Session'],
    }),
    retryLastMessage: builder.mutation<ChatResponse, string>({
      query: (sessionId) => ({
        url: `/chat/retry/${sessionId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Session'],
    }),
    addMessageAndCreateSession: builder.mutation<ChatResponse, ChatCreatePayload>({
      query: (payload) => ({
        url: '/chat/new',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Session'],
    }),
  }),
});

export const {
  useAddMessageMutation: useAddMessageApiMutation,
  useRetryLastMessageMutation: useRetryLastMessageApiMutation,
  useAddMessageAndCreateSessionMutation: useAddMessageAndCreateSessionApiMutation,
} = chatApiSlice;
