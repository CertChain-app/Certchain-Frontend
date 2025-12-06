import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"
import { OrganizerLoginSchema } from "../form/login/schema"

export const useOrganizerLogin = () => {
  return useMutation({
    mutationFn: (data: OrganizerLoginSchema) => {
      return api.organizer.auth.login(data)
    },
  })
}
