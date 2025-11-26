import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => api.user.userEvent.one(id),
  })
}
