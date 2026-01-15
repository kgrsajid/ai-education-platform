import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CardPayload, CardsCreatePayload, CardUpdatePayload } from "../../api/card/type";
import { cardApi } from "../../api/card";
import { message } from "antd";

export const useGetAllCardQuery = (params: CardPayload) => {
  return useQuery({
    queryKey: ["card", params],
    queryFn: () => cardApi.getAll(params),
  });
};

export const useGetCardByIdQuery = (id?: string) => {
  return useQuery({
    queryKey: ["card", id],
    queryFn: () => cardApi.getById(id),
    enabled: !!id,
  });
}

export const useCreateCardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["card"],
    mutationFn: (payload: CardsCreatePayload) => cardApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["card"]});
    }
  })
}

export const useUpdateCardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["card"],
    mutationFn: (payload: CardUpdatePayload) => cardApi.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["card"]});
      message.success("Карточка успешно обновлено")
    }
  })
}