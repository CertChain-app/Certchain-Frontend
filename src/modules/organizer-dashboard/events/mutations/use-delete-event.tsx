import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.organizer.event.remove(id),
    onSuccess: () => {
      toast.success("The event has been deleted successfully.")
      queryClient.invalidateQueries({ queryKey: ["events"] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
