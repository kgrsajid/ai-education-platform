import {
  useCreateSessionApiMutation,
  useGetAllSessionsApiQuery,
  useGetSessionByIdApiQuery,
} from '../../api/session';

export const useCreateSessionMutation = () => {
  const [trigger, result] = useCreateSessionApiMutation();
  return {
    ...result,
    isPending: result.isLoading,
    mutate: trigger,
    mutateAsync: trigger,
  };
};

export const useGetSessionsQuery = () => {
  return useGetAllSessionsApiQuery();
};

export const useGetSessionByIdQuery = (id?: string) => {
  return useGetSessionByIdApiQuery(id as string, {
    skip: !id || id === 'new',
  });
};
