import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"
import { OrganizerResetPasswordSchema } from "../form/reset-password/schema"

export const useOrganizerResetPassword = () => {
  return useMutation({
    mutationFn: (data: OrganizerResetPasswordSchema) => {
      return api.organizer.auth.resetPassword(data)
    },
  })
}
