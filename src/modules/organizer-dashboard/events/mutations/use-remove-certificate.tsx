import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useRemoveCertificate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (certificateId: string) =>
      api.organizer.certificate.remove(certificateId),
    onSuccess: () => {
      toast.success("Certificate removed successfully")
      queryClient.invalidateQueries({
        queryKey: ["organizer-event-certificates"],
      })
    },
  })
}
