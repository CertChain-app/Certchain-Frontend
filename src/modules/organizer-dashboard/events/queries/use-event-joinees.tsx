import { api } from "@/api"
import { IApiParams } from "@/api/types"
import { useQuery } from "@tanstack/react-query"

export const useEventJoinees = (eventId: string, params: IApiParams) => {
  return useQuery({
    queryKey: ["event-joinees", eventId, params],
    queryFn: () => api.organizer.event.getJoinees(eventId, params),
  })
}
