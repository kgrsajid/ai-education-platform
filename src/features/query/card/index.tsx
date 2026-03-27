import { message } from 'antd';
import {
  useGetAllCardsApiQuery,
  useGetCardByIdApiQuery,
  useCreateCardApiMutation,
  useUpdateCardApiMutation,
  useGenerateCardsApiMutation,
} from '../../api/card';
import type { CardPayload, CardsCreatePayload, CardUpdatePayload, GenerateCardsPayload } from '../../api/card/type';

export const useGetAllCardQuery = (params: CardPayload) => {
  return useGetAllCardsApiQuery(params);
};

export const useGetCardByIdQuery = (id?: string) => {
  return useGetCardByIdApiQuery(id as string, { skip: !id });
};

export const useCreateCardMutation = () => {
  const [trigger, result] = useCreateCardApiMutation();
  return {
    ...result,
    isPending: result.isLoading,
    mutate: (payload: CardsCreatePayload) => {
      trigger(payload)
        .unwrap()
        .then(() => {
          message.success('Card set created successfully!');
        })
        .catch((err: any) => {
          const msg = err?.data?.message || err?.data?.error || 'Failed to create card set';
          message.error(msg);
        });
    },
    mutateAsync: (payload: CardsCreatePayload) => trigger(payload).unwrap(),
  };
};

export const useGenerateCardsMutation = () => {
  const [trigger, result] = useGenerateCardsApiMutation();
  return {
    ...result,
    isPending: result.isLoading,
    mutate: (payload: GenerateCardsPayload) => trigger(payload),
    mutateAsync: (payload: GenerateCardsPayload) => trigger(payload).unwrap(),
  };
};

export const useUpdateCardMutation = () => {
  const [trigger, result] = useUpdateCardApiMutation();

  const mutate = async (payload: CardUpdatePayload) => {
    await trigger(payload).unwrap();
    message.success('Карточка успешно обновлено');
  };

  return {
    ...result,
    isPending: result.isLoading,
    mutate,
    mutateAsync: mutate,
  };
};
