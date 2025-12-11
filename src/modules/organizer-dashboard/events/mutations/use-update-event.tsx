import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"
import { EventSchema } from "../forms/schema"

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: (data: { id: string; event: EventSchema }) => {
      return api.organizer.event.update(data.id, data.event)
    },
  })
}
