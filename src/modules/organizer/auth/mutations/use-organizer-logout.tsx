import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useOrganizerLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.organizer.auth.logout(),
    onSuccess: () => {
      window.location.reload()
      queryClient.invalidateQueries({ queryKey: ["session"] })
    },
  })
}
