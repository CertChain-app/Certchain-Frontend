import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useAssignCertificatesToAll = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (eventId: string) =>
      api.organizer.certificate.createBulk(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizer-event-certificates"],
      })
      toast.success("Certificates assigned successfully")
    },
  })
}
