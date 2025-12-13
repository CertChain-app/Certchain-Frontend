import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"
import { OrganizerProfileSchema } from "../form/schema"

export const useUpdateOrganizerProfile = () => {
  return useMutation({
    mutationFn: (data: OrganizerProfileSchema) => {
      return api.organizers.update("profile", data)
    },
  })
}
