import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"
import { OrganizerForgotPasswordSchema } from "../form/forgot-password/schema"

export const useOrganizerForgotPassword = () => {
  return useMutation({
    mutationFn: (data: OrganizerForgotPasswordSchema) => {
      return api.organizer.auth.forgotPassword(data)
    },
  })
}
