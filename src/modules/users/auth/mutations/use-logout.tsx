import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const ACCESS_TOKEN_KEY = "cc_access_token"

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.user.auth.logout(),
    onSuccess: () => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY)
      }
      window.location.reload()
      queryClient.invalidateQueries({ queryKey: ["user-session"] })
    },
  })
}
