import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"
import { OrganizerRegisterSchema } from "../form/schema"

export const useOrganizerAuthRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: OrganizerRegisterSchema) =>
      api.organizer.auth.register(data),
  })
}
