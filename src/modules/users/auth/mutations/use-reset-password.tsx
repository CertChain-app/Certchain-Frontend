import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"
import { ResetPasswordSchema } from "../forms/reset-password/schema"

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordSchema) => {
      return api.user.auth.resetPassword(data)
    },
  })
}
