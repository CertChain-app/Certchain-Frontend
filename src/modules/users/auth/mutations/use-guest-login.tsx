import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useGuestLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.user.auth.guestLogin(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-session"] })
    },
  })
}
