import {
  useAddMessageApiMutation,
  useRetryLastMessageApiMutation,
  useAddMessageAndCreateSessionApiMutation,
} from '../../api/chat';
import type { ChatPayload, ChatCreatePayload } from '../../api/chat/type';

export const useAddChatMutation = () => {
  const [trigger, result] = useAddMessageApiMutation();
  return {
    ...result,
    isPending: result.isLoading,
    mutate: (payload: ChatPayload) => trigger(payload),
    mutateAsync: (payload: ChatPayload) => trigger(payload),
  };
};

export const useRetryLastMessage = () => {
  const [trigger, result] = useRetryLastMessageApiMutation();
  return {
    ...result,
    isPending: result.isLoading,
    mutate: (sessionId: string) => trigger(sessionId),
    mutateAsync: (sessionId: string) => trigger(sessionId),
  };
};

export const useCreateChatMutation = () => {
  const [trigger, result] = useAddMessageAndCreateSessionApiMutation();
  return {
    ...result,
    isPending: result.isLoading,
    mutate: (payload: ChatCreatePayload) => trigger(payload),
    mutateAsync: (payload: ChatCreatePayload) => trigger(payload),
  };
};
