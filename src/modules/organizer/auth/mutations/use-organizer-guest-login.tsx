import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useOrganizerGuestLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.organizer.auth.guestLogin(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] })
    },
  })
}
