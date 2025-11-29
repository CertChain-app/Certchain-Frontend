import { api } from "@/api"
import { IApiParams } from "@/api/types"
import { useQuery } from "@tanstack/react-query"

export const useConversations = (params: IApiParams) => {
  return useQuery({
    queryKey: ["conversations", params],
    queryFn: () => api.user.conversation.all(params),
  })
}
