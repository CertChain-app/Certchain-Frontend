import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useOrganizer = (id: string) => {
  return useQuery({
    queryKey: ["organizer"],
    queryFn: () => {
      return api.organizers.one(id)
    },
    enabled: !!id,
  })
}
