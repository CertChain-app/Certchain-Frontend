import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useMarkEventAsCompleted = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (eventId: string) => {
      return api.organizer.event.markAsCompleted(eventId)
    },
    onSuccess: ({}, variables) => {
      toast.success("Event marked as completed")
      queryClient.invalidateQueries({ queryKey: ["event", variables] })
    },
  })
}
