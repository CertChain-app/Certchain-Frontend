import { api } from "@/api"
import { IApiParams } from "@/api/types"
import { useQuery } from "@tanstack/react-query"

export const usePublicEvents = (params?: IApiParams) => {
  return useQuery({
    queryKey: ["public-events", params],
    queryFn: () => api.user.event.all(params ?? {}),
  })
}
