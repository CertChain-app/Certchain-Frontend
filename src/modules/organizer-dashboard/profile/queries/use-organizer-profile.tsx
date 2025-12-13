import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useOrganizerProfile = () => {
  return useQuery({
    queryKey: ["organizer-profile"],
    queryFn: () => api.organizers.profile(),
  })
}
