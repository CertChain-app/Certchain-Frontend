import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BanUserFromEventSchema } from "../ban-forms/schema"

interface BanUserParams {
  id: string
  data: BanUserFromEventSchema
}

export function useBanUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: BanUserParams) =>
      api.organizer.userEvent.ban(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event-joinees"],
      })
    },
  })
}
