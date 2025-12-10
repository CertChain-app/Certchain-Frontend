import { api } from "@/api"
import { IApiParams } from "@/api/types"
import { useQuery } from "@tanstack/react-query"

export const useEventCertificates = (eventId: string, params: IApiParams) => {
  return useQuery({
    queryKey: ["organizer-event-certificates", eventId, params],
    queryFn: () => api.organizer.certificate.findAll(eventId, params),
  })
}
