import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"
import { ForgotPasswordSchema } from "../forms/forgot-password/schema"

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordSchema) =>
      api.user.auth.forgotPassword(data),
  })
}
