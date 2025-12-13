import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export function useUnbanUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: string }) => api.organizer.userEvent.unban(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event-joinees"],
      })
      toast.success("User unbanned successfully")
    },
  })
}
