import { api } from "@/api"
import { IApiParams } from "@/api/types"
import { useQuery } from "@tanstack/react-query"

export const useEvents = (params: IApiParams) => {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => api.organizer.event.all(params),
  })
}
