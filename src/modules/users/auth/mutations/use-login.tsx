import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LoginSchema } from "../forms/login/schema"

const ACCESS_TOKEN_KEY = "cc_access_token"

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: LoginSchema) => api.user.auth.login(data),
    onSuccess: (response) => {
      const accessToken = (
        response.data?.data as { tokens?: { accessToken?: string } } | undefined
      )?.tokens?.accessToken
      if (accessToken && typeof window !== "undefined") {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
      }
      queryClient.invalidateQueries({ queryKey: ["user-session"] })
    },
  })
}
