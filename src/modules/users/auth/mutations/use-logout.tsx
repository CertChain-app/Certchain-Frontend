import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.user.auth.logout(),
    onSuccess: () => {
      window.location.reload()
      queryClient.invalidateQueries({ queryKey: ["user-session"] })
    },
  })
}
