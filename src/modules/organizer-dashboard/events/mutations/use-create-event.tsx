import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { EventSchema } from "../forms/schema"

export const useCreateEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: EventSchema) => {
      return api.organizer.event.create(data)
    },
    onSuccess: () => {
      toast.success("Event created successfully")
      queryClient.invalidateQueries({
        queryKey: ["events"],
        type: "all",
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
