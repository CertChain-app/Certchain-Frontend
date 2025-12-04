import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"
import { OrganizationLoginSchema } from "../organization-login-form/schema"

export const useOrganizerSubdomainLogin = () => {
  return useMutation({
    mutationFn: (data: OrganizationLoginSchema) => {
      return api.organizer.auth.signInWithOrganization(data)
    },
  })
}
