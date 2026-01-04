import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LoginSchema } from "../forms/login/schema"

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: LoginSchema) => api.user.auth.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-session"] })
    },
  })
}
