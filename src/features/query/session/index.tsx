import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { sessionApi } from "../../api/session"


export const useCreateSessionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sessionApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["session"]});
    }
  })
}
export const useGetSessionsQuery = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: sessionApi.getAll,
    
  })
}
export const useGetSessionByIdQuery = (id?: string) => {
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id as string),
    enabled: Boolean(id) && id != "new", 
  });
};