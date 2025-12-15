import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useConversations = () => {
  return useQuery({
    queryKey: ["organizer-conversations"],
    queryFn: () => api.organizer.conversation.getConversations(),
  })
}
