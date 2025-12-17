import { useMutation, useQueryClient } from "@tanstack/react-query"
import { chatApi } from "../../api/chat"

export const useAddChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:chatApi.addMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    }
  })
}

export const useCreateChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:chatApi.addMessageAndCreateSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    }
  })
}