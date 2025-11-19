import { api } from "@/api"
import { IApiParams } from "@/api/types"
import { useQuery } from "@tanstack/react-query"

export const useUpcomingEvents = (params: IApiParams) => {
  return useQuery({
    queryKey: ["upcoming-events"],
    queryFn: () => api.user.event.upcoming(params),
  })
}
